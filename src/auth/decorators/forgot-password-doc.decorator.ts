import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiBody, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';

export function ApiForgotPassword() {
  return applyDecorators(
    ApiOperation({ summary: 'Request a password reset link' }),
    ApiQuery({
      name: 'lang',
      required: false,
      description: 'Language code for localization',
      type: String,
      example: 'en',
      enum: ['en', 'ar'],
    }),
    ApiBody({
      type: ForgotPasswordDto,
      description: 'Email to send the password reset link to',
      examples: {
        example1: {
          summary: 'Forgot password example',
          value: { email: 'sama@example.com' },
        },
      },
    }),
    ApiOkResponse({ description: 'Password reset link has been sent if the email exists.' }),
    ApiBadRequestResponse({ description: 'Bad request. Invalid input data.' }),
  );
}
