import { CreateUserDto } from '../dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserEntity implements CreateUserDto {
  @ApiProperty({ required: true, nullable: false })
  username: string;

  @ApiProperty({ required: true, nullable: false })
  email: string;

  @ApiProperty({ required: true, nullable: false })
  name: string;

  @ApiProperty({ required: true, nullable: false })
  password: string;

  @ApiProperty({ required: false, nullable: true, default: 'USER' })
  role: 'ADMIN' | 'USER';
}
