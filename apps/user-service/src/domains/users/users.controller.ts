import { Body, Controller, Post } from "@nestjs/common"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { UsersService } from "./users.service"
import { CreateUserDto } from "./dtos/create-user.dto"

@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new user",
    description: "Creates a new user in the system.",
  })
  public async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto.firstName)

    return {
      id: user.id,
      firstName: user.firstName,
    }
  }
}
