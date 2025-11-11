import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export function ApiDeleteUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a user by id' }),
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
    ApiOkResponse({ description: 'User deleted', schema: { example: { success: true } } }),
    ApiUnauthorizedResponse({ description: 'Unauthorized. Missing or invalid token.' }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiBadRequestResponse({ description: 'Bad request. Invalid id.' }),
  );
}
