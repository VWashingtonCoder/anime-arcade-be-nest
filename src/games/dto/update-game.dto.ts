import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateGameDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({ default: '' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @ApiProperty({ default: '' })
  description: string;
}
