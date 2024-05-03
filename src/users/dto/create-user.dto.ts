import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

const required = { required: true, nullable: false };

const error = {
  string: (property: string) => `${property} must be a string`,
  empty: (property: string) => `${property} must not be empty`,
  min: (property: string, length: number) =>
    `${property} must be at least ${length} characters long`,
  max: (property: string, length: number) =>
    `${property} must be at most ${length} characters long`,
};

export class CreateUserDto {
  @IsString({ message: error.string('Username') })
  @IsNotEmpty({ message: error.empty('Username') })
  @MinLength(4, { message: error.min('Username', 4) })
  @MaxLength(20, { message: error.max('Username', 20) })
  @ApiProperty(required)
  username: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @ApiProperty(required)
  email: string;

  @IsString({ message: error.string('Name') })
  @IsNotEmpty({ message: error.empty('Name') })
  @MinLength(2, { message: error.min('Name', 2) })
  @MaxLength(50, { message: error.max('Name', 50) })
  @ApiProperty(required)
  name: string;

  @IsString({ message: error.string('Password') })
  @IsNotEmpty({ message: error.empty('Password') })
  @MinLength(8, { message: error.min('Password', 8) })
  @MaxLength(50, { message: error.max('Password', 50) })
  @ApiProperty(required)
  password: string;

  @IsEnum(['ADMIN', 'USER'], { message: 'Role must be either ADMIN or USER' })
  @ApiProperty({ required: false, default: 'USER' })
  role: 'ADMIN' | 'USER';
}
