import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUsersDto } from './dto/list-users.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCreateUser } from './decorators/create-user.decorator';
import { ApiFindAllUsers } from './decorators/find-all-users.decorator';
import { ApiFindOneUser } from './decorators/find-one-user.decorator';
import { ApiUpdateUser } from './decorators/update-user.decorator';
import { ApiDeleteUser } from './decorators/delete-user.decorator';
import { ApiUpdateUserStatus } from './decorators/update-user-status.decorator';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreateUser()
  create(@Body() dto: CreateUserDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiFindAllUsers()
  findAll(@Query() query: ListUsersDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
    return this.usersService.findAll(query);
  }

 
  @Get(':id')
  @ApiFindOneUser()
  async findOne(@Param('id') id: string, @Query('lang') lang: 'en' | 'ar' = 'en') {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiUpdateUser()
  replace(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id')
  @ApiUpdateUserStatus()
  updateStatus(@Param('id') id: string, @Body() updateUserStatusDto: UpdateUserStatusDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
    return this.usersService.updateStatus(id, updateUserStatusDto);
  }

  @Delete(':id')
  @ApiDeleteUser()
  remove(@Param('id') id: string, @Query('lang') lang: 'en' | 'ar' = 'en') {
    return this.usersService.remove(id);
  }
}
