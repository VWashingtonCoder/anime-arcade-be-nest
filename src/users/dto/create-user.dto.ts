import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  MinLength,
  IsOptional,
} from 'class-validator';

const required = { required: true, nullable: false };
const error = {
  string: ' must be a string',
  empty: ' must not be empty',
};

export class CreateUserDto {
  @IsString({ message: `Username ${error.string}` })
  @IsNotEmpty({ message: `Username ${error.empty}` })
  @MinLength(4, { message: 'Username must be at least 4 characters long' })
  @ApiProperty(required)
  username: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @ApiProperty(required)
  email: string;

  @IsString({ message: `Name ${error.string}` })
  @IsNotEmpty({ message: `Name ${error.empty}` })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @ApiProperty(required)
  name: string;

  @IsString({ message: `Password ${error.string}` })
  @IsNotEmpty({ message: `Password ${error.empty}` })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @ApiProperty(required)
  password: string;

  @IsEnum(['ADMIN', 'USER'], { message: 'Role must be either ADMIN or USER' })
  @ApiProperty({ required: false, default: 'USER' })
  role: 'ADMIN' | 'USER';
}
