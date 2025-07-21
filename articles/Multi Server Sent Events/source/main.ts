import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { useContainer } from 'class-validator';
import { AppModule } from './backend/app.module';

const bootstrap = async(): Promise<void> => {
    const fastifyAdapter = new FastifyAdapter();

    const options: NestApplicationOptions = {
        bufferLogs: true,
    };

    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        fastifyAdapter,
        options,
    );

    const appModule = app.select(AppModule);


    const globalPipe = new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    });

    app.useGlobalPipes(globalPipe);
    app.setGlobalPrefix('api');

    app.enableCors();
    app.enableShutdownHooks();

    useContainer(appModule, { fallbackOnErrors: true });

    await app.listen('3300', '0.0.0.0');
};

bootstrap();
