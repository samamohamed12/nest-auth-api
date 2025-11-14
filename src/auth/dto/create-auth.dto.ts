import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateAuthDto {
	@ApiProperty({ example: 'sama' })
	@IsString()
	username: string;

	@ApiProperty({ example: 'sama@example.com' })
	@IsEmail()
	email: string;

	@ApiProperty({ example: 'strongPassword123' })
	@IsString()
	@MinLength(6)
	password: string;
}
