import config from "./config"

import { Module } from "@nestjs/common"

import { ConfigModule } from "@nestjs/config"
import { NotificationsModule } from "./notifications/notifications.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),

    NotificationsModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
