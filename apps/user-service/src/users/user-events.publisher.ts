import { RABBITMQ_SERVICE } from "@/rabbitmq/rabbitmq.module"
import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { UserEvents } from "./users.events-definition"

@Injectable()
export class UserEventsPublisher {
  constructor(
    @Inject(RABBITMQ_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  publishUserCreatedEvent(userId: string, firstName: string) {
    this.client.emit(UserEvents.USER_CREATED, {
      id: userId,
      firstName,
    })
  }
}
