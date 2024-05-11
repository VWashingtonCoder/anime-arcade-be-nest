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

  create(createScoreDto: CreateScoreDto) {
    const newScore = this.prisma.score.create({
      data: createScoreDto,
    });

    if (newScore) return newScore;
    else throw new UnauthorizedException('ERROR: Score not created');
  }

  findAll() {
    const scores = this.prisma.score.findMany();
    if (scores) return scores;
    else throw new NotFoundException('No scores found');
  }

  remove(id: number) {
    const removedScore = this.prisma.score.delete({
      where: { id },
    });

    if (removedScore) return removedScore;
    else throw new NotFoundException('Score not found');
  }
}
