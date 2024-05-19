import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ScoresService {
  constructor(private prisma: PrismaService) {}

  async create(createScoreDto: CreateScoreDto) {
    const newScore = await this.prisma.score.create({
      data: createScoreDto,
    });

    if (newScore) return newScore;
    else throw new UnauthorizedException('ERROR: Score not created');
  }

  async findAll() {
    const scores = await this.prisma.score.findMany();
    if (scores) return scores;
    else throw new NotFoundException('No scores found');
  }

  async remove(id: number) {
    const removedScore = await this.prisma.score.delete({
      where: { id },
    });

    if (removedScore) return removedScore;
    else throw new NotFoundException('Score not found');
  }
}
