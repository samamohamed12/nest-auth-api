import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, MaxLength, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'sama', description: 'Unique username' })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @ApiProperty({ example: 'Sama', description: 'Full name', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiProperty({ example: 'sama@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongP@ssw0rd' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

