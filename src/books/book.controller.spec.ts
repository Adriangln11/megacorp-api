import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { AddBookDto } from './dto/add-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UsersController', () => {
  let bookController: BooksController;
  let bookService: BooksService;
  let bookRepository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    bookController = module.get<BooksController>(BooksController);
    bookService = module.get<BooksService>(BooksService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  describe('books', () => {
    it('should return an array of books when there are books', () => {
      const books: Book[] = [
        {
          id: 1,
          title: 'Siddhartha',
          author: 'Hermann Hesse',
          released: new Date(),
          price: 222,
          available: true,
        },
        {
          id: 2,
          title: '1984',
          author: 'George Orwell',
          released: new Date(),
          price: 222,
          available: true,
        },
      ];
      jest.spyOn(bookService, 'getBooks').mockResolvedValue(books);

      return expect(bookController.getBooks()).resolves.toEqual(books);
    });

    it('should return a user object when given a valid user id', () => {
      const books: Book[] = [
        {
          id: 1,
          title: 'Siddhartha',
          author: 'Hermann Hesse',
          released: new Date(),
          price: 222,
          available: true,
        },
        {
          id: 2,
          title: '1984',
          author: 'George Orwell',
          released: new Date(),
          price: 222,
          available: true,
        },
      ];
      jest.spyOn(bookService, 'getBookById').mockResolvedValue(books[0]);

      return expect(bookController.getBookById(1)).resolves.toBeTruthy();
    });

    describe('addBook', () => {
      it('should add a new book with all required fields', () => {
        const newBook: Book = {
          id: 1,
          title: 'Book Title',
          author: 'Book Author',
          price: 10.99,
          released: new Date(),
          available: true,
        };

        jest.spyOn(bookService, 'addBook').mockResolvedValue(newBook);
        return expect(bookController.addBook(newBook)).resolves.toBe(newBook);
      });
    });
  });
});
