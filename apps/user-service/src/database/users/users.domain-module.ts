import { TypeOrmModule } from "@nestjs/typeorm"
import { Global, Module } from "@nestjs/common"

import { User } from "./user.entity"
import { UsersRepository } from "./users.repository"

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class UsersDomainModule {}
