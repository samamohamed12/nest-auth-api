import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiQuery, ApiBody, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { SendOtpDto } from '../dto/send-otp.dto';

export function ApiSendOtp() {
  return applyDecorators(
    ApiOperation({ summary: 'Send OTP to user email' }),
    ApiQuery({
      name: 'lang',
      required: false,
      description: 'Language code for localization',
      type: String,
      example: 'en',
      enum: ['en', 'ar'],
    }),
    ApiBody({
      type: SendOtpDto,
      description: 'Email payload to receive OTP',
      examples: {
        example1: {
          summary: 'Send OTP example',
          value: {
            email: 'user@example.com',
          },
        },
      },
    }),
    ApiOkResponse({
      description: 'OTP sent successfully (logged or emailed)',
      schema: { example: { message: 'OTP sent successfully (check console)' } },
    }),
    ApiBadRequestResponse({ description: 'Bad request. Invalid input data or user not found.' }),
  );
}
