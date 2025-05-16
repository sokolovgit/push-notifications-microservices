import { Processor, WorkerHost } from "@nestjs/bullmq"
import { NotificationsQueue } from "./notifications.queue-definition"
import { Job } from "bullmq"
import { UserCreatedNotificationJobData } from "./interfaces/user-created-notification.job-data.interface"
import { NotificationsService } from "./notifications.service"

@Processor(NotificationsQueue.UserCreatedNotification)
export class UserCreatedNotificationProcessor extends WorkerHost {
  constructor(private readonly notificationsService: NotificationsService) {
    super()
  }

  async process(
    job: Job<UserCreatedNotificationJobData, void, string>,
    _token?: string,
  ): Promise<void> {
    await this.notificationsService.processUserCreatedNotification(
      job.data.id,
      job.data.firstName,
    )
  }
}
