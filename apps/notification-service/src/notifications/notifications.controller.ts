import { Controller } from "@nestjs/common"
import { EventPattern, Payload } from "@nestjs/microservices"
import { CreatedUserDto } from "./dtos/created-user.dto"
import { NotificationsService } from "./notifications.service"

@Controller()
export class NotificationsListener {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern("user.created")
  async handleUserCreated(@Payload() data: CreatedUserDto) {
    await this.notificationsService.createDelayedUserCreatedNotification(data)
  }
}
