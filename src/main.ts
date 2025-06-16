import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { useContainer } from "class-validator"
import * as compression from "compression"
import * as useragent from "express-useragent"
import helmet from "helmet"

import { AppModule } from "./app.module"
import { PrismaClientExceptionFilter } from "./middlewares"
import { logger } from "./utils"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.useGlobalFilters(new PrismaClientExceptionFilter())
  app.setGlobalPrefix("/api")

  const configService = app.get(ConfigService)
  const appConfig = configService.get("appConfig")

  app.enableCors({ origin: true, credentials: true })

  app.use(helmet())
  app.use(compression())
  app.use(useragent.express())

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle("NestJS Template")
    .setDescription("API Documentation For NestJS Template")
    .setVersion("1.0")
    .addBearerAuth()
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("docs", app, documentFactory, { swaggerOptions: { defaultModelsExpandDepth: -1, persistAuthorization: true } })

  await app.listen(appConfig.PORT || 3000, () => {
    logger.info(`Server is starting on ${appConfig.APP_URL}:${appConfig.PORT}/api at ${new Date()} with process id: ${process.pid}`)
  })
}

bootstrap()
