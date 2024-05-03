import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  // Get Game List
  findAll() {
    return this.prisma.game.findMany();
  }

  // Create Game
  async create(newGame: CreateGameDto) {
    const { name } = newGame;
    const existingGameName = await this.prisma.game.findUnique({
      where: {
        name,
      },
    });

    if (existingGameName) return 'Game name already exists';

    const createGame = await this.prisma.game.create({
      data: newGame,
    });

    return createGame;
  }

  // Update Game Details
  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  // Delete Game
  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
