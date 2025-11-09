import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiBody, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ResetPasswordDto } from '../dto/reset-password.dto';

export function ApiResetPassword() {
  return applyDecorators(
    ApiOperation({ summary: 'Reset user password using token' }),
    ApiQuery({
      name: 'lang',
      required: false,
      description: 'Language code for localization',
      type: String,
      example: 'en',
      enum: ['en', 'ar'],
    }),
    ApiBody({
      type: ResetPasswordDto,
      description: 'Token and new password',
      examples: {
        example1: {
          summary: 'Reset password example',
          value: { token: 'a1b2c3d4-token', newPassword: 'newStrongPassword123' },
        },
      },
    }),
    ApiOkResponse({ description: 'Password has been reset successfully.' }),
    ApiBadRequestResponse({ description: 'Bad request. Invalid input data or token.' }),
  );
}
