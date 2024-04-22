import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';

const required = { required: true, nullable: false };
const error = {
  string: ' must be a string',
  empty: ' must not be empty',
};

export class CreateUserEntity implements Partial<User> {
  @ApiProperty(required)
  @IsString({ message: `Username ${error.string}` })
  @IsNotEmpty({ message: `Username ${error.empty}` })
  username: string;

  @ApiProperty(required)
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty(required)
  @IsString({ message: `Name ${error.string}` })
  @IsNotEmpty({ message: `Name ${error.empty}` })
  name: string;

  @ApiProperty(required)
  @IsString({ message: `Password ${error.string}` })
  @IsNotEmpty({ message: `Password ${error.empty}` })
  password: string;

  @ApiProperty({ required: false, nullable: true, default: 'USER' })
  role: 'ADMIN' | 'USER';
}
