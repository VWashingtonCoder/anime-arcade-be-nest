import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


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
