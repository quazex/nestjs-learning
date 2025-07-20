import { MigrationsFactory } from '../../source';
import { ExampleBasicModule } from './module';

const bootstrap = async(): Promise<void> => {
    await MigrationsFactory.init(ExampleBasicModule);
};

bootstrap();
