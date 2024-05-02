import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsString({ message: `Password must be a string` })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsOptional()
  @ApiProperty()
  password: string;
}
