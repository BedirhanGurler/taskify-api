import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './DTO/create-user.dto';
import { UserService } from './user.service';
import type { Request } from 'express';

/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
