import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export function ApiFindAllUsers() {
  return applyDecorators(
    ApiOperation({ summary: 'Get list of users' }),
    ApiQuery({
      name: 'lang',
      required: false,
      description: 'Language code for localization',
      type: String,
      example: 'en',
      enum: ['en', 'ar'],
    }),
    ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number }),
    ApiQuery({ name: 'limit', required: false, description: 'Items per page', type: Number }),
    ApiQuery({ name: 'isActive', required: false, description: 'Filter by active users', type: Boolean }),
    ApiQuery({ name: 'search', required: false, description: 'Search by username or email', type: String }),
    ApiQuery({ name: 'sort', required: false, description: "Sort by createdAt: 'ASC' or 'DESC'", type: String, example: 'DESC' }),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized. Missing or invalid token.' }),
    ApiOkResponse({
      description: 'List of users',
      schema: {
        example: {
          data: [
            { id: 'uuid', username: 'sama', name: 'sama', email: 'sama@example.com', isActive: true, createdAt: '2025-01-01T00:00:00.000Z' },
          ],
          total: 1,
          page: 1,
          limit: 10,
        },
      },
    }),
  );
}
