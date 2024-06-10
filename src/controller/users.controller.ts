import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from 'src/service/users.service';
import { User } from 'src/schema/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: { username: string, password: string }): Promise<User> {
    return this.usersService.create(createUserDto.username, createUserDto.password);
  }

  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User> {
    return this.usersService.findOne(username);
  }
}
