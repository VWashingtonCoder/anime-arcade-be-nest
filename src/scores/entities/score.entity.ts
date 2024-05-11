import { Score } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ScoreEntity implements Score {
  @ApiProperty()
  id: number;

  @ApiProperty()
  score: number;

  @ApiProperty()
  gameId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  createdAt: Date;
}
