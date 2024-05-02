import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsString({ message: `Password must be a string` })
  @IsOptional()
  @ApiProperty()
  password: string;
}
