import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcryptjs';
import { UserEntity } from './entities/user.entity';

function hashPassword(password: string) {
  return hash(password, 10);
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  async create(user: CreateUserDto) {
    const { username, email, role } = user;

    user.password = await hashPassword(user.password);
    user.role = role || 'USER';

    const existingUsername = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUsername) return 'Username already exists';

    const existingEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail) return 'Email already exists';

    const newUser = await this.prisma.user.create({
      data: user,
    });

    return newUser;
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
