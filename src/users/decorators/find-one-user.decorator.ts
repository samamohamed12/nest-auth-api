import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export function ApiFindOneUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a user by id' }),
    ApiQuery({
      name: 'lang',
      required: false,
      description: 'Language code for localization',
      type: String,
      example: 'en',
      enum: ['en', 'ar'],
    }),
    ApiParam({ name: 'id', required: true, description: 'User id', type: String }),
    ApiBearerAuth(),
    ApiOkResponse({ description: 'User found', schema: { example: { id: 'uuid', username: 'sama', name: 'sama', email: 'sama@example.com', isActive: true, createdAt: '2025-01-01T00:00:00.000Z' } } }),
    ApiUnauthorizedResponse({ description: 'Unauthorized. Missing or invalid token.' }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiBadRequestResponse({ description: 'Bad request. Invalid id.' }),
  );
}
