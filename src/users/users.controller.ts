import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiCreateUser } from './decorators/api-create-user.decorator';
import { ApiFindAllUsers } from './decorators/api-find-all-users.decorator';
import { ApiFindOneUser } from './decorators/api-find-one-user.decorator';
import { ApiUpdateUser } from './decorators/api-update-user.decorator';
import { ApiDeleteUser } from './decorators/api-delete-user.decorator';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreateUser()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiFindAllUsers()
  findAll() {
    return this.usersService.findAll();
  }

 
  @Get(':id')
  @ApiFindOneUser()
  async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiUpdateUser()
  replace(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }


  @Patch(':id')
  @ApiUpdateUser()
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiDeleteUser()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
