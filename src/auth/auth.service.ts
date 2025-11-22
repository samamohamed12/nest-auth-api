import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { I18nService } from 'nestjs-i18n';
import { CreateAuthDto } from './dto/create-auth.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}

  async register(email: string, password: string) {
    // Delegate creation to UsersService which handles username generation and hashing
    const created = await this.usersService.create({ email, password } as any);
    const token = this.jwtService.sign({ id: created.id, email: created.email, role: created.role });
    return { token, user: { id: created.id, email: created.email, role: created.role, username: created.username } };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException(await this.i18n.translate('errorMessage.auth.invalid_credentials'));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException(await this.i18n.translate('errorMessage.auth.invalid_credentials'));

    const token = this.jwtService.sign({ id: user.id, email: user.email, role: user.role });
    return { token };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException(await this.i18n.translate('errorMessage.auth.user_not_found'));

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    await this.usersService.update(user.id, { otpCode, otpExpiry: expiry } as any);

    console.log(` Reset token for ${email}: ${otpCode}`);
    return await this.i18n.translate('successMessage.auth.reset_token_generated');
  }

  async resetPassword(email: string,otpCode: string, newPassword: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.otpCode || user.otpCode !== otpCode || !user.otpExpiry || user.otpExpiry < new Date()) {
      throw new BadRequestException(await this.i18n.translate('errorMessage.auth.invalid_or_expired_otpCode'));
    }
    await this.usersService.update(user.id, { password: await bcrypt.hash(newPassword, 10), otpCode: null, otpExpiry: null } as any);

    return await this.i18n.translate('successMessage.auth.password_updated');
  }

   async sendOtp(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException(await this.i18n.translate('errorMessage.auth.user_not_found'));
    // OTP code consisting of 6 digits
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // Expiry in 5 minutes

    await this.usersService.update(user.id, { otpCode: otp, otpExpiry: expiry } as any);

    console.log(` OTP for ${email}: ${otp}`);
    return await this.i18n.translate('successMessage.auth.otp_sent');
  }

  async validateOtp(email: string, otp: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.otpCode) {
      throw new BadRequestException(await this.i18n.translate('errorMessage.auth.no_otp_found'));
    }

    if (user.otpCode !== otp) {
      throw new BadRequestException(await this.i18n.translate('errorMessage.auth.invalid_otp_code'));
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      throw new BadRequestException(await this.i18n.translate('errorMessage.auth.otp_expired'));
    }

    await this.usersService.update(user.id, { otpCode: null, otpExpiry: null } as any);

    return await this.i18n.translate('successMessage.auth.otp_validated');
  }
 
}
