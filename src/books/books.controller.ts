import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { AddBookDto } from './dto/add-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Book')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiBearerAuth()
  @ApiBody({ type: AddBookDto })
  @UseGuards(JwtAuthGuard)
  @Post('/new')
  addBook(@Body() newBook: AddBookDto) {
    return this.booksService.addBook(newBook);
  }
  @Get()
  getBooks() {
    return this.booksService.getBooks();
  }
  @Get(':id')
  getBookById(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.getBookById(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/stock/:id')
  setBookStock(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.setBookStock(id);
  }
  @ApiBearerAuth()
  @ApiBody({ type: AddBookDto })
  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  updateBook(@Param('id', ParseIntPipe) id: number, @Body() book: AddBookDto) {
    return this.booksService.updateBook(book);
  }
}
