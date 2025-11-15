import { Controller, Post, Body, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiRegister } from './decorators/register-doc.decorator';
import { ApiForgotPassword } from './decorators/forgot-password-doc.decorator';
import { ApiLogin } from './decorators/login-doc.decorator';
import { ApiResetPassword } from './decorators/reset-password-doc.decorator';
import { ApiSendOtp } from './decorators/send-otp-doc.decorator';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { Roles } from '../guards/decorators/roles.decorator';

import { I18nService } from 'nestjs-i18n';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly i18n: I18nService,

  ) {}

  @Post('register')
  @ApiRegister()
  register(@Body() body: CreateAuthDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
      this.i18n.translate('successMessage.auth.user_registered',
         { lang }
        )as string
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  @ApiLogin()
  login(@Body() body: LoginDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
      this.i18n.translate('successMessage.auth.login_success',
         { lang }
        )as string
    return this.authService.login(body.email , body.password);
  }

  @Post('forgot-password')
  @ApiForgotPassword()
  forgotPassword(@Body() body: ForgotPasswordDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
      this.i18n.translate('successMessage.auth.otp_sent',
         { lang }
        )as string
    return this.authService.forgotPassword(body.email);
  }

  @Post('reset-password')
  @ApiResetPassword()
  resetPassword(@Body() body: ResetPasswordDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
      this.i18n.translate('successMessage.auth.password_updated',
         { lang }
        )as string
    
    return this.authService.resetPassword(body.email, body.otpCode, body.newPassword);
  }
  @Post('send-otp')
  @ApiSendOtp()
  sendOtp(@Body() body: SendOtpDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
      this.i18n.translate('successMessage.auth.otp_sent',
         { lang }
        )as string
    return this.authService.sendOtp(body.email);
  }
  @Post()
  @Roles(['admin'])
  async createRoles(@Body() dto: CreateAuthDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
      this.i18n.translate('successMessage.auth.roles_created',
         { lang }
        )as string
  return this.authService.createRoles(dto);
}

}
