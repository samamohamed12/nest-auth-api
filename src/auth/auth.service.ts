import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
  const user = await this.usersService.findByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async register(dto: any): Promise<any> {
    // Implement user registration logic here
    return { message: 'User registered successfully' };
  }
  async forgotPassword(email: string): Promise<any> {
    // Implement forgot password logic here
    return { message: `Password reset link sent to ${email}` };
  }
  async resetPassword(token: string, newPassword: string): Promise<any> {
    // Implement reset password logic here
    return { message: 'Password has been reset successfully' };
  }
}
