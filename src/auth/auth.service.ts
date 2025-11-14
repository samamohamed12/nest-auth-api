import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    // Delegate creation to UsersService which handles username generation and hashing
    const created = await this.usersService.create({ email, password } as any);
    return created;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { token };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('User not found');

    const resetToken = uuidv4();
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    await this.usersService.update(user.id, { resetToken, resetTokenExpiry: expiry } as any);

    console.log(` Reset token for ${email}: ${resetToken}`);
    return { message: 'Reset token generated and logged in console' };
  }

  async resetPassword(resetToken: string, newPassword: string) {
    const user = await this.usersService.findOneByResetToken(resetToken);
    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired token');
    }
    await this.usersService.update(user.id, { password: await bcrypt.hash(newPassword, 10), resetToken: null, resetTokenExpiry: null } as any);

    return { message: 'Password updated successfully' };
  }
   async sendOtp(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('User not found');

    // OTP code consisting of 6 digits
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // Expiry in 5 minutes

    await this.usersService.update(user.id, { otpCode: otp, otpExpiry: expiry } as any);

    console.log(` OTP for ${email}: ${otp}`);
    return { message: 'OTP sent successfully (check console)' };
  }

  async validateOtp(email: string, otp: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.otpCode) {
      throw new BadRequestException('No OTP found for this user');
    }

    if (user.otpCode !== otp) {
      throw new BadRequestException('Invalid OTP code');
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      throw new BadRequestException('OTP expired');
    }

    await this.usersService.update(user.id, { otpCode: null, otpExpiry: null } as any);

    return { message: 'OTP validated successfully' };
  }
}
