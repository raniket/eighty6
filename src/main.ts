import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);

	// Initialize Swagger
	const config = new DocumentBuilder()
		.setTitle('My NestJS API')
		.setDescription('API description')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api-docs', app, document);

	const port = configService.get('APP_PORT');

	await app.listen(port);
	console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
