import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: "The first name of the user",
    example: "John",
    required: true,
  })
  firstName: string
}
