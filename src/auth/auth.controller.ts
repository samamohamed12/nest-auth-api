import { Body, Controller, Post, Get, Request, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from './auth.guard';
import { ApiLogin } from './decorators/login-doc.decorator';
import { ApiForgotPassword } from './decorators/forgot-password-doc.decorator';
import { ApiRegister } from './decorators/register-doc.decorator';
import { ApiResetPassword } from './decorators/reset-password-doc.decorator';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiLogin()
  login(@Body() loginDto: Record<string, any>, @Query('lang') lang: 'en' | 'ar' = 'en') {
    return this.authService.login(loginDto.username, loginDto.password);
  }
  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiRegister()
  register(@Body() dto: CreateAuthDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
    return this.authService.register(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  @ApiForgotPassword()
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  @ApiResetPassword()
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
    return this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.newPassword);
  }

}

