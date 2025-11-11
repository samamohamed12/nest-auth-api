import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateUserStatusDto {
  @ApiProperty({ example: true, description: 'Set to true to activate, false to deactivate' })
  @IsBoolean()
  isActive: boolean;
}
