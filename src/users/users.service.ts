import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserEntity } from './entities/create-user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcryptjs';

function hashPassword(password: string) {
  return hash(password, 10);
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async create(user: CreateUserEntity) {
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

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
