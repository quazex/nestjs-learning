import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './configs/app.config';

const bootstrap = async(): Promise<void> => {
    const app = await NestFactory.create(AppModule);

    const config = app.get(AppConfig);
    const pipe = new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    });

    app.useGlobalPipes(pipe);
    app.enableShutdownHooks();

    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: VersioningType.URI,
    });

    await app.listen(config.port, '0.0.0.0');
};

bootstrap();
