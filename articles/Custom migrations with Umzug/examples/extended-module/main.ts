import { MigrationsFactory } from '../../source';
import { ExampleExtendedModule } from './module';

const bootstrap = async(): Promise<void> => {
    await MigrationsFactory.init(ExampleExtendedModule);
};

bootstrap();
