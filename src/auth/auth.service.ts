import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtAuthService: JwtService,
  ) {}
  async registerUser(user: CreateUserDto) {
    try {
      const { name, memberType, phone } = user;
      const info = { name, memberType, phone };
      const exist = await this.userRepository.findOne({
        where: { name, phone },
      });

      if (exist)
        return new HttpException('User already exist', HttpStatus.CONFLICT);

      const newUser = this.userRepository.create(info);
      const userCreated = await this.userRepository.save(newUser);
      const payload = { name, phone };
      const token = this.jwtAuthService.sign(payload);
      const response = {
        ...userCreated,
        token,
      };

      return response;
    } catch (e) {
      const response = {
        status: 'error',
        code: e.code,
        message: e.sqlMessage,
      };
      return response;
    }
  }
}
