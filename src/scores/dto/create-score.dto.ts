import { IsNotEmpty, IsNumber } from 'class-validator';
import { ScoreEntity } from '../entities/score.entity';

export class CreateScoreDto extends ScoreEntity {
  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsNumber()
  @IsNotEmpty()
  gameId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
