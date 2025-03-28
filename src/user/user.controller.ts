import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserServices } from './user.service';
import { User } from './user.entity';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserServices) { }

    @Post()
    async adduser(
        @Body() user: UserDto
    ): Promise<User> {
        return await this.userService.addUser(user);
    }

    @Get()
    async findUser(
        @Query() user: UserDto
    ): Promise<User> {
        return await this.userService.getUser(user);
    }
}
