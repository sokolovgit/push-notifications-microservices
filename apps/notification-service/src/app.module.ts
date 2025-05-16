import config from "./config"

import { Module } from "@nestjs/common"

import { ConfigModule, ConfigService } from "@nestjs/config"
import { NotificationsModule } from "./notifications/notifications.module"
import { BullModule } from "@nestjs/bullmq"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),

    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>("redis.host"),
          port: configService.get<number>("redis.port"),
        },
      }),
    }),

    NotificationsModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
