import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export function ApiUpdateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a user by id' }),
    ApiQuery({
      name: 'lang',
      required: false,
      description: 'Language code for localization',
      type: String,
      example: 'en',
      enum: ['en', 'ar'],
    }),
    ApiParam({ name: 'id', required: true, description: 'User id', type: String }),
    ApiBody({ type: UpdateUserDto, description: 'Fields to update' }),
    ApiBearerAuth(),
    ApiOkResponse({ description: 'User updated', schema: { example: { id: 'uuid', username: 'sama', name: 'sama', email: 'sama@example.com', isActive: true } } }),
    ApiUnauthorizedResponse({ description: 'Unauthorized. Missing or invalid token.' }),
    ApiBadRequestResponse({ description: 'Bad request. Invalid input data.' }),
    ApiNotFoundResponse({ description: 'User not found' }),
  );
}
