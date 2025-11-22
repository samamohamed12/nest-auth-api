import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiBody, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ResetPasswordDto } from '../dto/reset-password.dto';

export function ApiResetPassword() {
  return applyDecorators(
    ApiOperation({ summary: 'Reset user password using otpcode' }),
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
      description: 'otpCode and new password',
      examples: {
        example1: {
          summary: 'Reset password example',
          value: { otpCode: '123456', newPassword: 'newStrongPassword123' },
        },
      },
    }),
    ApiOkResponse({ description: 'Password has been reset successfully.' }),
    ApiBadRequestResponse({ description: 'Bad request. Invalid input data or otpCode.' }),
  );
}
