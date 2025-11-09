import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';

export function ApiDeleteUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a user by id' }),
    ApiParam({ name: 'id', required: true, description: 'User id', type: String }),
    ApiOkResponse({ description: 'User deleted', schema: { example: { success: true } } }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiBadRequestResponse({ description: 'Bad request. Invalid id.' }),
  );
}
