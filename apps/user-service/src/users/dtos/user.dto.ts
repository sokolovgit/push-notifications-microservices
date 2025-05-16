import { Uuid } from "@/commons"
import { User } from "@/database/users/user.entity"
import { ApiProperty } from "@nestjs/swagger"
import { randomUUID } from "crypto"

export class UserDto {
  @ApiProperty({
    name: "id",
    description: "The unique identifier of the user",
    example: randomUUID(),
  })
  id: Uuid

  @ApiProperty({
    name: "firstName",
    description: "The first name of the user",
    example: "John",
  })
  firstName: string

  constructor(user: User) {
    this.id = user.id
    this.firstName = user.firstName
  }
}
