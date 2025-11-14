import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiQuery, ApiBody, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { ValidateOtpDto } from '../dto/validate-otp.dto';

export function ApiValidateOtp() {
  return applyDecorators(
    ApiOperation({ summary: 'Validate OTP for a user' }),
    ApiQuery({
      name: 'lang',
      required: false,
      description: 'Language code for localization',
      type: String,
      example: 'en',
      enum: ['en', 'ar'],
    }),
    ApiBody({
      type: ValidateOtpDto,
      description: 'OTP validation payload',
      examples: {
        example1: {
          summary: 'Validate OTP example',
          value: {
            email: 'user@example.com',
            otp: '123456',
          },
        },
      },
    }),
    ApiOkResponse({
      description: 'OTP validated successfully',
      schema: { example: { message: 'OTP validated successfully' } },
    }),
    ApiBadRequestResponse({ description: 'Bad request. Invalid input data or OTP.' }),
  );
}
