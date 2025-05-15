import { Module } from "@nestjs/common"
import { NotificationsListener } from "./notifications.controller"

@Module({
  imports: [],
  controllers: [NotificationsListener],
  providers: [],
  exports: [],
})
export class NotificationsModule {}
