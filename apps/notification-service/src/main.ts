import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigService } from "@nestjs/config"
import { Logger } from "@nestjs/common"
import { MicroserviceOptions, Transport } from "@nestjs/microservices"

async function bootstrap() {
  const logger = new Logger()

  const app = await NestFactory.create(AppModule)

  const config = app.get(ConfigService)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [config.get<string>("rabbitmq.url")],
      queue: config.get<string>("rabbitmq.userQueue"),
      queueOptions: {
        durable: true,
      },
      wildcards: true,
    },
  })

  await app.startAllMicroservices()
  logger.log("Notification service is running")
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
