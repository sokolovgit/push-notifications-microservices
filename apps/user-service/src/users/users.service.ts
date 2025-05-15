import { UsersRepository } from "@/database/users/users.repository"
import { Injectable } from "@nestjs/common"
import { UserEventsPublisher } from "./user-events.publisher"

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userEventsPublisher: UserEventsPublisher,
  ) {}

  async createUser(firstName: string) {
    const user = await this.usersRepository.createUser(firstName)

    this.userEventsPublisher.publishUserCreatedEvent(user.id, user.firstName)

    return user
  }
}
