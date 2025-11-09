import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiCreatedResponse, ApiBadRequestResponse, ApiQuery } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export function ApiCreateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new user' }),
    ApiQuery({
      name: 'lang',
      required: false,
      description: 'Language code for localization',
      type: String,
      example: 'en',
      enum: ['en', 'ar'],
    }),
    ApiBody({
      type: CreateUserDto,
      description: 'User creation payload',
      examples: {
        example1: {
          summary: 'Create user example',
          value: { name: 'John Doe', email: 'john@example.com', password: 'strongPass1' },
        },
      },
    }),
    ApiCreatedResponse({ description: 'User successfully created', schema: { example: { userId: 'uuid', name: 'John Doe', email: 'john@example.com' } } }),
    ApiBadRequestResponse({ description: 'Bad request. Invalid input data.' }),
  );
}
