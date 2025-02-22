import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "dotenv";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { OpenAPIObject } from "@nestjs/swagger/dist/interfaces";

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configSwagger = new DocumentBuilder()
    .setTitle("API Simulador de Fretes")
    .setVersion("1.0")
    .build();

  const documentFactory = (): OpenAPIObject =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    SwaggerModule.createDocument(app, configSwagger, {
      autoTagControllers: true,
    });

  SwaggerModule.setup("docs", app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
