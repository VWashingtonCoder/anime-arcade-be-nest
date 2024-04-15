import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';

const error = {
  isString: 'must be a string',
  isNotEmpty: 'must not be empty',
};
export class CreateUserDto {
  @IsString({ message: 'Username ' + error.isString })
  @IsNotEmpty({ message: 'Username' + error.isNotEmpty })
  username: string;

  @IsEmail({ message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email ' + error.isNotEmpty })
  email: string;

  @IsString({ message: 'Name ' + error.isString })
  @IsNotEmpty({ message: 'Name' + error.isNotEmpty })
  name: string;

  @IsString({ message: 'Password ' + error.isString })
  @IsNotEmpty({ message: 'Password ' + error.isNotEmpty })
  password: string;

  @IsEnum(['ADMIN', 'USER'], { message: 'Role must be either admin or user' })
  role: ['ADMIN', 'USER'];
}
