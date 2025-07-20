# NestJS Umzug

A module for updating database content using [Umzug](https://github.com/sequelize/umzug).

The key idea is to create a separate entry point in a single application using a CLI. This allows you to separate the full server startup with all dependencies from the database content management module. You can find a ready-made implementation in the `examples` folder of the library.

### Key Features:

* Implemented as a NestJS module;
* Supports DI and other third-party NestJS modules;
* Supports Unit and E2E testing;
* Full support for TypeScript developer tools and Debugger;
* Implementation and test examples;
* Can be used without precompilation;
* CLI for managing migrations based on [nest-commander](https://github.com/thawankeane/nest-inngest);
* Migration file generation from a built-in template;
* Supports persistent storage in Postgres.

## Quick Start

To create a migration provider, you need to follow these mandatory steps:

1. Add the `@Migration()` class decorator;
2. Specify the `order` parameter to ensure the correct execution order of migrations;
3. Implement the `IMigrationHandler` interface.

The class name is automatically used as the migration name; otherwise, the class functions like a regular NestJS provider.

> ⚠️ **Attention:** The migration name must be unique across all migrations!

```typescript
import { Migration, MigrationHandler } from '@quazex/nestjs-umzug';

@Migration({
    order: 1, // or timestamp
})
export class MyMigrationClass implements MigrationHandler {
    constructor(private readonly provider: SomeProvider) {}

    async up(): Promise<void> {
        await provider.create();
    }

    async down(): Promise<void> {
        await provider.delete();
    }
}
```

Next, you need to create a file to launch the CLI module and connect all the required providers and modules. Here you can import any modules from the main application that are needed for use in the migrations.

```typescript
import { MigrationsFactory, UmzugPostgresModule } from '@quazex/nestjs-umzug';
import { MyMigrationClass } from './migration';
import { SomeProvider } from './provider';

async function bootstrap() {
    await MigrationsFactory.init({
        imports: [
            UmzugPostgresModule.forRoot({
                connection: 'postgres://postgres:postgres@localhost:5432/database',
            }),
        ],
        providers: [SomeProvider, MyMigrationClass],
    });
}

bootstrap();
```

Finally, run the CLI command to execute migrations without building into JS:

```bash
ts-node some-path/main.ts migrate up
```

## CLI

The project supports only one `migrate` command with the following arguments:

* `up` - used to run all migrations that have not yet been applied;
* `down [string]` - used to roll back a list of migrations; you must specify the migration names separated by spaces;
* `generate` - used to create a migration file from the built-in template.

## Options

* `connection` - URL for connecting to Postgres or a configuration object;
* `generating` - A set of settings for generating migrations from a template (optional);
* `generating.path` - Path for the generated files;
* `table` - the name of the table for storing the migration history.
