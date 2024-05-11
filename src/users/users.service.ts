import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcryptjs';

function hashPassword(password: string) {
  return hash(password, 10);
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  async create(newUser: CreateUserDto) {
    const { username, email, role } = newUser;

    newUser.password = await hashPassword(newUser.password);
    newUser.role = role || 'USER';

    const existingUsername = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUsername) throw new BadRequestException('Username already exists');

    const existingEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail) throw new BadRequestException('Email already exists');

    const createUser = await this.prisma.user.create({
      data: newUser,
    });

    if (createUser) return createUser;
    else throw new UnauthorizedException('ERROR: User not created');
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (updateUserDto.password) {
      user.password = await hashPassword(updateUserDto.password);
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    return this.prisma.user.update({
      where: { id },
      data: user,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
