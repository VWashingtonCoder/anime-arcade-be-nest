import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query, 
  ParseIntPipe, 
  ValidationPipe,
  UseGuards
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { CreateUserEntity } from './entities/create-user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly user: UsersService) {}

  @Get() // ADMIN Route: Get all users
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [UserEntity] })
  findAll() {
    return this.user.findAll()
  }

  @Post('create') // PUBLIC Route: Create a new user
  @ApiCreatedResponse({ type: CreateUserEntity })
  create(@Body(ValidationPipe) user: CreateUserEntity) {
    return this.user.create(user);
  }

  // @Patch(':id') // Public Route: Update a user (password specifically)
  // @ApiOkResponse({ type: UserEntity })
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.prisma.user.update({
  //     where: { id: Number(id) },
  //     data: updateUserDto,
  //   });
  // }

  // @Delete(':id')
  // @ApiOkResponse({ type: UserEntity })
  // remove(@Param('id') id: string) {
  //   return this.prisma.user.delete({
  //     where: { id: Number(id) },
  //   });
  // }
}
