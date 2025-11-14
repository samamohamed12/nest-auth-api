import { Controller, Post, Body, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiRegister } from './decorators/register-doc.decorator';
import { ApiForgotPassword } from './decorators/forgot-password-doc.decorator';
import { ApiLogin } from './decorators/login-doc.decorator';
import { ApiResetPassword } from './decorators/reset-password-doc.decorator';
import { ApiSendOtp } from './decorators/send-otp-doc.decorator';
import { ApiValidateOtp } from './decorators/validate-otp-doc.decorator';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { ValidateOtpDto } from './dto/validate-otp.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiRegister()
  register(@Body() body: CreateAuthDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  @ApiLogin()
  login(@Body() body: LoginDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
    return this.authService.login(body.username || (body as any).email, (body as any).password);
  }

  @Post('forgot-password')
  @ApiForgotPassword()
  forgotPassword(@Body() body: ForgotPasswordDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
    return this.authService.forgotPassword(body.email);
  }

  @Post('reset-password')
  @ApiResetPassword()
  resetPassword(@Body() body: ResetPasswordDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
    return this.authService.resetPassword((body as any).token || (body as any).resetToken || (body as ResetPasswordDto).token, body.newPassword);
  }
  @Post('send-otp')
  @ApiSendOtp()
  sendOtp(@Body() body: SendOtpDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
    return this.authService.sendOtp(body.email);
  }

  @Post('validate-otp')
  @ApiValidateOtp()
  validateOtp(@Body() body: ValidateOtpDto, @Query('lang') lang: 'en' | 'ar' = 'en') {
    return this.authService.validateOtp(body.email, body.otp);
  }
}
