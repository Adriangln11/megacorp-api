import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';

describe('UsersController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  // Tests that the method successfully creates a new user with all required fields
  it('should create a new user with all required fields', async () => {
    // Arrange
    const user = {
      id: 1,
      name: 'John Doe',
      phone: 1234567890,
      memberType: 'free',
      createdAt: new Date(),
      token: 'gyhv342f14gc324g2423',
      books: '',
    };

    jest.spyOn(authService, 'registerUser').mockResolvedValue(user);
    const data = {
      name: 'John Doe',
      phone: 1234567890,
      memberType: 'free',
    };

    return expect(authController.registerUser(data)).resolves.toEqual(user);
  });
});
