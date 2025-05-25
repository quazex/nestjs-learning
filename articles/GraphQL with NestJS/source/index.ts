import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AppConfig } from './configs/app.config';

const bootstrap = async(): Promise<void> => {
    const fastifyAdapter = new FastifyAdapter();

    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        fastifyAdapter,
    );

    const config = app.get(AppConfig);
    const pipe = new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    });

    app.useGlobalPipes(pipe);
    app.enableShutdownHooks();

    app.enableCors();

    await app.listen(config.port, '0.0.0.0');
};

bootstrap();
