import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get() // ADMIN Route: Get all users
  findAll() {
    const dbUsers = this.prisma.user.findMany();
    const users = dbUsers.then((users) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return users.map(({ password, ...user }) => user);
    });
    return users;
  }

  @Post('create') // PUBLIC Route: Create a new user
  create(@Body() userInfo: CreateUserDto) {
    const { username, email } = userInfo;

    const existingUsername = this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUsername) {
      return {
        error: 'Username already exists',
      };
    }

    const existingEmail = this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingEmail) {
      return {
        error: 'Email already exists',
      };
    }

    const newUser = this.prisma.user.create({
      data: userInfo,
    });

    return newUser;
  }

  // @Post('login')
  // create(@Body() userInfo) {
  //   return console.log(this.prisma);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
