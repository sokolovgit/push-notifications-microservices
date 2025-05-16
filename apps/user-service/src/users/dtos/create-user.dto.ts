import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "The first name of the user",
    example: "John",
    required: true,
  })
  firstName: string
}
