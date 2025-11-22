import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiQuery, ApiBody, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';

export function ApiLogin() {
  return applyDecorators(
    ApiOperation({ summary: 'Authenticate user and return JWT' }),
    ApiQuery({
      name: 'lang',
      required: false,
      description: 'Language code for localization',
      type: String,
      example: 'en',
      enum: ['en', 'ar'],
    }),
    ApiBody({
      type: LoginDto,
      description: 'Login data',
      examples: {
        example1: {
          summary: 'Login example',
          value: {
            email: 'sama@example.com',
            password: '123456',
          },
        },
      },
    }),
    ApiOkResponse({
      description: 'Successful login returns an access token',
      schema: { example: { access_token: 'eyJhbGciOi...' } },
    }),
    ApiBadRequestResponse({ description: 'Bad request. Invalid input data.' }),
  );
}
