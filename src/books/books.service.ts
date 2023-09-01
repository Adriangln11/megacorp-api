import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddBookDto } from './dto/add-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}
  async addBook(book: AddBookDto) {
    const exist = await this.bookRepository.findOne({
      where: { title: book.title },
    });
    if (exist)
      return new HttpException('Book already exists', HttpStatus.CONFLICT);

    const newBook = this.bookRepository.create(book);
    return this.bookRepository.save(newBook);
  }
  async getBooks() {
    const books = await this.bookRepository.find();
    if (!books)
      return new HttpException('There is no books', HttpStatus.NO_CONTENT);
    return books;
  }
  async getBookById(id: number) {
    const book = await this.bookRepository.findOne({
      where: { id: id },
    });
    if (!book) return new HttpException('Book not found', HttpStatus.NOT_FOUND);
    return book;
  }
  async setBookStock(id: number) {
    const book = await this.bookRepository.findOne({
      where: { id: id },
    });
    if (!book) return new HttpException('Book not found', HttpStatus.NOT_FOUND);
    book.available = !book.available;
    return this.bookRepository.save(book);
  }
  async updateBook(book: AddBookDto) {
    const exist = await this.bookRepository.findOne({
      where: { title: book.title },
    });
    if (!exist)
      return new HttpException('Book not found', HttpStatus.NOT_FOUND);
    const updatedBook = Object.assign(exist, book);
    return this.bookRepository.save(updatedBook);
  }
}
