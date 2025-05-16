import { ConfigService } from "@nestjs/config"
import { INestApplication } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

export const createDocument = (app: INestApplication) => {
  const config = app.get(ConfigService)

  const docsPath = config.get<string>("docs.path")

  const options = new DocumentBuilder()
    .setTitle("User Service")
    .setDescription("User Service API description")
    .setVersion("1.0")
    .build()

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup(docsPath, app, document)
}
