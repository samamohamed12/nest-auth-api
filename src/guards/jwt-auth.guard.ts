import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from './decorators/public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
 
    // If the route is marked as public, skip authentication
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const auth = req.headers?.authorization;
    if (!auth) throw new UnauthorizedException('Missing authorization header');
    const [type, token] = auth.split(' ');
    if (type !== 'Bearer' || !token) throw new UnauthorizedException('Invalid authorization header');

    try {
      const payload: any = this.jwtService.verify(token);
      if (!payload || !payload.id) throw new UnauthorizedException('Invalid token payload');

      // attach user to request
      const user = await this.usersService.findOne(payload.id);
      if (!user) throw new UnauthorizedException('User not found');
      req.user = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
