import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true, nullable: false })
  username: string;

  @ApiProperty({ required: true, nullable: false })
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: true, nullable: false })
  password: string;

  @ApiProperty()
  role: 'ADMIN' | 'USER';

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
