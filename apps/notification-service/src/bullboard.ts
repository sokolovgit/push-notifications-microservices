import { INestApplication, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import { BullMQAdapter } from "@bull-board/api/bullMQAdapter"
import { createBullBoard } from "@bull-board/api"
import { ExpressAdapter } from "@bull-board/express"
import { Queue } from "bullmq"

import { NotificationsQueue } from "./notifications/notifications.queue-definition"

const logger = new Logger("BullBoard")

export const showBullBoard = (app: INestApplication): void => {
  const config = app.get(ConfigService)

  const port = config.get<number>("port")
  const redisConnection = {
    host: config.get<string>("redis.host"),
    port: config.get<number>("redis.port"),
  }

  const userCreatedQueue = new Queue(
    NotificationsQueue.UserCreatedNotification,
    {
      connection: redisConnection,
    },
  )

  const serverAdapter = new ExpressAdapter()

  serverAdapter.setBasePath("/queues")

  createBullBoard({
    queues: [new BullMQAdapter(userCreatedQueue)],
    serverAdapter,
  })

  app.use("/queues", serverAdapter.getRouter())

  logger.log(`🎯 BullBoard is running on http://localhost:${port}/queues`)
}
