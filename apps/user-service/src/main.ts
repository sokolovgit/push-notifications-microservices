import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigService } from "@nestjs/config"
import { Logger } from "@nestjs/common"
import { createDocument } from "./docs/swagger"

async function bootstrap() {
  const logger = new Logger()

  const app = await NestFactory.create(AppModule)

  const config = app.get(ConfigService)
  const port = config.get<string>("port")

  const isDocsEnabled = config.get<boolean>("docs.enabled")

  await app.listen(port, "0.0.0.0")

  logger.log(`🚀 Application is running on: http://localhost:${port}`)

  if (isDocsEnabled) {
    createDocument(app)
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
