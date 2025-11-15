import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ example: 'a1b2c3d4-token' })
  @IsString()
  otpCode: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'newStrongPassword123' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
