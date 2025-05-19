import { Body, Controller, Post } from "@nestjs/common"
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { UsersService } from "./users.service"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UserDto } from "./dtos/user.dto"

@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new user",
    description: "Creates a new user in the system.",
  })
  @ApiOkResponse({
    description: "User created successfully",
    type: UserDto,
  })
  public async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto.firstName)

    return new UserDto(user)
  }
}
