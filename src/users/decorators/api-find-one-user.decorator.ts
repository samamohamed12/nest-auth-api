import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export function ApiFindOneUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a user by id' }),
    ApiParam({ name: 'id', required: true, description: 'User id', type: String }),
    ApiOkResponse({ description: 'User found', schema: { example: { userId: 'uuid', name: 'sama', email: 'sama@example.com' } } }),
    ApiNotFoundResponse({ description: 'User not found' }),
  );
}
