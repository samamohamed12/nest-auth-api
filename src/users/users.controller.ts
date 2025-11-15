import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUsersDto } from './dto/list-users.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../guards/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiCreateUser } from './decorators/create-user.decorator';
import { ApiFindAllUsers } from './decorators/find-all-users.decorator';
import { ApiFindOneUser } from './decorators/find-one-user.decorator';
import { ApiUpdateUser } from './decorators/update-user.decorator';
import { ApiDeleteUser } from './decorators/delete-user.decorator';
import { ApiUpdateUserStatus } from './decorators/update-user-status.decorator';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { I18nService } from 'nestjs-i18n';


@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly i18n: I18nService
  ) {}

  @Post()
  @ApiCreateUser()
  @Roles(['admin'])
  create(@Body() dto: CreateUserDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
      this.i18n.translate('successMessage.users.user_created',
         { lang }
        )as string
    return this.usersService.create(dto) ;
  }

  @Get()
  @ApiFindAllUsers()
  @Roles(['admin'])
  findAll(@Query() query: ListUsersDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
      this.i18n.translate('successMessage.users.users_retrieved',
         { lang }
        )as string
    return  this.usersService.findAll(query);
  }

 
  @Get(':id')
  @ApiFindOneUser()
  async findOne(@Param('id') id: string, @Query('lang') lang: 'en' | 'ar' = 'en') {
      this.i18n.translate('successMessage.users.user_retrieved',
         { lang }
        )as string
    return  this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiUpdateUser()
  @Roles(['admin'])
  replace(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
      this.i18n.translate('successMessage.users.user_updated',
         { lang }
        )as string
    return  this.usersService.update(id, updateUserDto);
  }

  @Patch(':id')
  @ApiUpdateUserStatus()
  @Roles(['admin'])
  updateStatus(@Param('id') id: string, @Body() updateUserStatusDto: UpdateUserStatusDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
      this.i18n.translate('successMessage.users.user_status_updated',
         { lang }
        )as string
    return  this.usersService.updateStatus(id, updateUserStatusDto);
  }

  @Delete(':id')
  @ApiDeleteUser()
  @Roles(['admin'])
  remove(@Param('id') id: string, @Query('lang') lang: 'en' | 'ar' = 'en') {
      this.i18n.translate('successMessage.users.user_deleted',
         { lang }
        )as string
    return  this.usersService.remove(id);
  }
  


}
