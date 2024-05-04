import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GameEntity } from './entities/game.entity';

@Controller('games')
@ApiTags('Games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get() // GET Game List (Public)
  @ApiOkResponse({ type: [GameEntity] })
  findAll() {
    return this.gamesService.findAll();
  }

  @Post() // POST Create Game (Admin)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateGameDto })
  create(@Body() createGameDto: CreateGameDto) {
    console.log(createGameDto);
    // return this.gamesService.create(createGameDto);
  }

  @Patch(':id') // PATCH Update Game Details (Admin)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UpdateGameDto })
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @Delete(':id') // DELETE Delete Game (Admin)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: GameEntity })
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
}
