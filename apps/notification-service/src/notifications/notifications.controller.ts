import { Controller } from "@nestjs/common"
import { EventPattern, Payload } from "@nestjs/microservices"

@Controller()
export class NotificationsListener {
  constructor() {}

  @EventPattern("user.created")
  handleUserCreated(@Payload() data: { id: string; username: string }) {
    // eslint-disable-next-line no-console
    console.log(`Received user.created: ${JSON.stringify(data)}`)
  }
}
