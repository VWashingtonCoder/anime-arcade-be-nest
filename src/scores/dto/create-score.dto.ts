import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScoreDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  score: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  gameId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}
