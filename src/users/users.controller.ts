import {
  Controller,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
  @ApiBearerAuth()
  @ApiBody({ type: CreateUserDto })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: CreateUserDto,
  ) {
    return this.usersService.updateUser(id, user);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id/books')
  getBooks(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getBooks(id);
  }
  @ApiBearerAuth()
  @ApiBody({ type: Any })
  @UseGuards(JwtAuthGuard)
  @Patch(':id/rent-book')
  addBooks(@Param('id', ParseIntPipe) id: any, @Body() title: any) {
    return this.usersService.addBook(id, title);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id/remove-book/:bookTitle')
  removeBookFromUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('bookTitle') bookTitle: string,
  ) {
    return this.usersService.removeBook(userId, bookTitle);
  }
}
