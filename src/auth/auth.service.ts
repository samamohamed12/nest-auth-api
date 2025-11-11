import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';
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
    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async register(dto: CreateUserDto): Promise<any> {
    // Hash the password and create the user via UsersService
    try {
      const saltRounds = 10;
      const hashed = await bcrypt.hash(dto.password, saltRounds);
      const toCreate: CreateUserDto = { ...dto, password: hashed };
      const user = await this.usersService.create(toCreate);
      // return a sanitized response (do not expose password)
      return {
        message: 'User registered successfully',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          isActive: user.isActive,
          createdAt: user.createdAt,
        },
      };
    } catch (err: any) {
      // Simple duplicate detection - DB drivers differ, so use message heuristics
      if (err && (err.code === '23505' || /duplicate|unique/i.test(err.message || ''))) {
        throw new ConflictException('User with provided identifier already exists');
      }
      throw new InternalServerErrorException('Failed to register user');
    }
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
