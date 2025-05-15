import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"

import config from "./config"
import { TypeOrmModule } from "@nestjs/typeorm"
import path from "path"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: configService.get("database.url"),
        entities: [
          path.resolve(__dirname, "database/domains/**/*.entity.{js,ts}"),
        ],
        migrations: [path.resolve(__dirname, "database/migrations/*.{js,ts}")],
        migrationsRun: false,
        logging: configService.get("database.logging"),
        synchronize: false,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
