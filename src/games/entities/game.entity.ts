import { Game } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class GameEntity implements Game {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
