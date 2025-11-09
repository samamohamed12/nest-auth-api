import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiQuery, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateAuthDto } from '../dto/create-auth.dto';

export function ApiRegister() {
  return applyDecorators(
    ApiOperation({ summary: 'Register a new user' }),
    ApiQuery({
      name: 'lang',
      required: false,
      description: 'Language code for localization',
      type: String,
      example: 'en',
      enum: ['en', 'ar'],
    }),
    ApiBody({
      type: CreateAuthDto,
      description: 'Registration data',
      examples: {
        example1: {
          summary: 'Register example',
          value: {
            username: 'sama',
            email: 'sama@example.com',
            password: 'strongPassword123',
          },
        },
      },
    }),
    ApiCreatedResponse({
      description: 'The user has been successfully registered.',
    }),
    ApiBadRequestResponse({ description: 'Bad request. Invalid input data.' }),
  );
}
