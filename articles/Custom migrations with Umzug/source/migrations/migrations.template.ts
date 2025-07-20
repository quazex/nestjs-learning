import { readFile } from 'fs/promises';
import { resolve } from 'path';
import dedent from 'dedent';
import { PackageJson } from 'type-fest';

export class MigrationsTemplate {
    public static async readPackage(): Promise<PackageJson> {
        const filepath = resolve(process.cwd(), 'package.json');
        const content = await readFile(filepath, 'utf8');
        return JSON.parse(content) as PackageJson;
    }

    public static async generate(timestamp: number): Promise<string> {
        const packageJSON = await MigrationsTemplate.readPackage();

        const template = dedent(`
            import { MigrationHandler, Migration } from '${packageJSON.name}';

            @Migration({
                order: ${timestamp},
            })
            export class MigrationProvider${timestamp} implements MigrationHandler {
                public async up(): Promise<void> {
                    throw new Error('Method not implemented');
                }

                public async down(): Promise<void> {
                    throw new Error('Method not implemented');
                }
            }
        `);

        return template.concat('\n');
    }
}
