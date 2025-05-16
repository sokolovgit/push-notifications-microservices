import { Module } from "@nestjs/common"
import { NotificationsListener } from "./notifications.controller"
import { NotificationsService } from "./notifications.service"
import { UserCreatedNotificationProcessor } from "./user-created-notification.processor"
import { BullModule } from "@nestjs/bullmq"
import { NotificationsQueue } from "./notifications.queue-definition"

@Module({
  imports: [
    BullModule.registerQueue({
      name: NotificationsQueue.UserCreatedNotification,
    }),
  ],
  controllers: [NotificationsListener],
  providers: [NotificationsService, UserCreatedNotificationProcessor],
})
export class NotificationsModule {}
