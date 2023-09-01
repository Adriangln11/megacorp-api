import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { response } from 'express';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('users', () => {
    it('should return all users in the database', () => {
      const users: User[] = [
        {
          id: 1,
          name: 'John',
          phone: 1234567890,
          memberType: 'basic',
          createdAt: new Date(),
          books: '',
        },
        {
          id: 2,
          name: 'Jane',
          phone: 9876543210,
          memberType: 'premium',
          createdAt: new Date(),
          books: '',
        },
      ];
      jest.spyOn(usersService, 'getUsers').mockResolvedValue(users);

      return expect(usersController.getUsers()).resolves.toEqual(users);
    });

    it('should return a user object when given a valid user id', () => {
      const users: User[] = [
        {
          id: 1,
          name: 'John',
          phone: 1234567890,
          memberType: 'basic',
          createdAt: new Date(),
          books: '',
        },
        {
          id: 2,
          name: 'Jane',
          phone: 9876543210,
          memberType: 'premium',
          createdAt: new Date(),
          books: '',
        },
      ];
      jest.spyOn(usersService, 'getUserById').mockResolvedValue(users[0]);

      return expect(usersController.getUserById(1)).resolves.toBe(users[0]);
    });

    it('should return an array of books when a valid user ID is provided', () => {
      const userId = 2;
      const users: User[] = [
        {
          id: 1,
          name: 'John',
          phone: 1234567890,
          memberType: 'basic',
          createdAt: new Date(),
          books: '',
        },
        {
          id: 2,
          name: 'Jane',
          phone: 9876543210,
          memberType: 'premium',
          createdAt: new Date(),
          books: 'book1, book2, book3',
        },
      ];

      jest.spyOn(usersService, 'getBooks').mockResolvedValue(users[1].books);
      return expect(usersController.getBooks(userId)).resolves.toBe(
        'book1, book2, book3',
      );
    });

    it('should delete the user with a valid id', () => {
      const response = {
        raw: [],
        affected: 1,
      };
      jest.spyOn(usersService, 'deleteUser').mockResolvedValue(response);

      return expect(usersController.deleteUser(1)).resolves.toBe(response);
    });
  });
});
