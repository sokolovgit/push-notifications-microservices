import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"

import { User } from "./user.entity"

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(firstName: string): Promise<User> {
    const user = this.userRepository.create({ firstName })

    return await this.userRepository.save(user)
  }
}
