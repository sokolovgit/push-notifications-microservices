import { Module } from "@nestjs/common"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"
import { UserEventsPublisher } from "./user-events.publisher"

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UserEventsPublisher],
})
export class UsersModule {}
