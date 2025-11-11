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
import { UpdateUserStatusDto } from '../dto/update-user-status.dto';

export function ApiUpdateUserStatus() {
  return applyDecorators(
    ApiOperation({ summary: 'Activate or deactivate a user (isActive)' }),
    ApiQuery({
      name: 'lang',
      required: false,
      description: 'Language code for localization',
      type: String,
      example: 'en',
      enum: ['en', 'ar'],
    }),
    ApiParam({ name: 'id', required: true, description: 'User id', type: String }),
    ApiBody({ type: UpdateUserStatusDto, description: 'Payload with isActive boolean' }),
    ApiBearerAuth(),
    ApiOkResponse({ description: 'User status updated', schema: { example: { id: 'uuid', isActive: true } } }),
    ApiUnauthorizedResponse({ description: 'Unauthorized. Missing or invalid token.' }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiBadRequestResponse({ description: 'Bad request. Invalid input.' }),
  );
}
