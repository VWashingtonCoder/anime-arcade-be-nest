import { Injectable, NotFoundException, BadRequestException  } from '@nestjs/common';
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

    if (existingGameName) throw new BadRequestException('Game name already exists'); 

    const createGame = await this.prisma.game.create({
      data: newGame,
    });

    return createGame;
  }

  // Update Game Details
  async update(id: number, updateGameDto: UpdateGameDto) {
    const { name, description } = updateGameDto;
    
    const gameDetails = await this.prisma.game.findUnique({
      where: {
        id,
      },
    });

    if (!gameDetails) throw new NotFoundException('Game not found with id ' + id)
    else if (!name && !description) throw new BadRequestException('No changes submitted');
    
    if (name) {
      const existingGameName = await this.prisma.game.findUnique({
        where: {
          name,
        },
      });

      if (existingGameName) throw new BadRequestException('Game name already exists')
      else if (name.length < 2 || name.length > 50) throw new BadRequestException('Name must be between 2 and 50 characters long');

      gameDetails.name = name;
    }    

    if (description) {
      if (description.length < 2 || description.length > 500) throw new BadRequestException('Description must be between 2 and 500 characters long');
      
      gameDetails.description = description;
    }

    const newGameDetails = await this.prisma.game.update({
      where: {
        id,
      },
      data: gameDetails,
    });
    
    return newGameDetails;
  }

  // Delete Game
  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
