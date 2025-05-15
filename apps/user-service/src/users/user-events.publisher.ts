import { RABBITMQ_SERVICE } from "@/rabbitmq/rabbitmq.module"
import { Inject, Injectable, Logger } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

@Injectable()
export class UserEventsPublisher {
  constructor(
    @Inject(RABBITMQ_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  logger = new Logger(UserEventsPublisher.name)

  publishUserCreatedEvent(userId: string, username: string) {
    this.logger.log(`Publishing user created event for userId: ${userId}`)

    this.client.emit("user.created", {
      id: userId,
      username,
    })

    this.logger.log(`User created event published for userId: ${userId}`)
  }
}
