import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoreEntity } from './entities/score.entity';
import { CreateScoreDto } from './dto/create-score.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('scores')
@ApiTags('Scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get() // PUBLIC Route: Get all scores
  findAll() {
    return this.scoresService.findAll();
  }

  @Post() // PUBLIC Route: Create a new score
  @ApiOkResponse({ type: CreateScoreDto })
  create(@Body() createScoreDto: CreateScoreDto) {
    return this.scoresService.create(createScoreDto);
  }

  @Delete(':id') // ADMIN Route: Delete a score
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ScoreEntity })
  remove(@Param('id') id: string) {
    return this.scoresService.remove(+id);
  }
}
