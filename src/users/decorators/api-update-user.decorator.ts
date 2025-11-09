import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiBody, ApiOkResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export function ApiUpdateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a user by id' }),
    ApiParam({ name: 'id', required: true, description: 'User id', type: String }),
    ApiBody({ type: UpdateUserDto, description: 'Fields to update' }),
    ApiOkResponse({ description: 'User updated', schema: { example: { userId: 'uuid', name: 'John Doe', email: 'john@example.com' } } }),
    ApiBadRequestResponse({ description: 'Bad request. Invalid input data.' }),
    ApiNotFoundResponse({ description: 'User not found' }),
  );
}
