import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiOkResponse } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export function ApiFindAllUsers() {
  return applyDecorators(
    ApiOperation({ summary: 'Get list of users' }),
    ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number }),
    ApiQuery({ name: 'limit', required: false, description: 'Items per page', type: Number }),
    ApiOkResponse({ description: 'List of users', schema: { example: [{ userId: 'uuid', name: 'John Doe', email: 'john@example.com' }] } }),
  );
}
