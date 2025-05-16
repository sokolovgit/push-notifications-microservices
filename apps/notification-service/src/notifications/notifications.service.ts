import { InjectQueue } from "@nestjs/bullmq"
import { Injectable } from "@nestjs/common"
import { NotificationsQueue } from "./notifications.queue-definition"
import { Queue } from "bullmq"
import { CreatedUserDto } from "./dtos/created-user.dto"
import { UserCreatedNotificationJobData } from "./interfaces/user-created-notification.job-data.interface"
import { ConfigService } from "@nestjs/config"
import axios from "axios"
import { Uuid } from "@/commons"

const HOUR_IN_MILLIS = 1000 * 60 * 60

@Injectable()
export class NotificationsService {
  constructor(
    @InjectQueue(NotificationsQueue.UserCreatedNotification)
    private readonly userCreatedNotificationQueue: Queue<UserCreatedNotificationJobData>,
    private readonly config: ConfigService,
  ) {}

  async createDelayedUserCreatedNotification(user: CreatedUserDto) {
    await this.addUserCreatedNotificationToQueue(user)
  }

  async processUserCreatedNotification(id: Uuid, firstName: string) {
    const webhookUniqueUrl = this.config.get<string>("webhook.uniqueUrl")

    await axios.post(webhookUniqueUrl, {
      title: "Welcome to our service!",
      message: `Hello ${firstName}, welcome to our service!`,
    })
  }

  private async addUserCreatedNotificationToQueue(
    user: CreatedUserDto,
  ): Promise<void> {
    const jobData: UserCreatedNotificationJobData = {
      id: user.id,
      firstName: user.firstName,
    }

    await this.userCreatedNotificationQueue.add("user-created", jobData, {
      delay: HOUR_IN_MILLIS * 24, // 24 hours
    })
  }
}
