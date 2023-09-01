import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.userRepository.find();
  }
  async getUserById(id: number) {
    const exist = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!exist)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    return exist;
  }
  async deleteUser(id: number) {
    const exist = await this.userRepository.delete({ id });
    if (exist.affected == 0)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    return exist;
  }
  async updateUser(id: number, user: CreateUserDto) {
    const exist = await this.userRepository.findOne({
      where: { id },
    });
    if (!exist)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);

    const updated = Object.assign(exist, user);
    return this.userRepository.save(updated);
  }
  async getBooks(id: number) {
    const exist = await this.userRepository.findOne({
      where: { id },
    });
    if (!exist)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    return exist.books;
  }
  async addBook(id: number, title: any) {
    const exist = await this.userRepository.findOne({
      where: { id },
    });
    if (!exist)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    exist.books += `, ${title.title}`;
    const updated = await this.userRepository.save(exist);
    return updated;
  }
  async removeBook(userId: any, bookTitle: any) {
    console.log(userId, bookTitle);
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const booksArray = user.books.split(',').map((i) => i.trim());

    const bookIndex = booksArray.findIndex((i) => i === bookTitle);

    if (bookIndex === -1) {
      throw new HttpException(
        "Book not found in user's books",
        HttpStatus.NOT_FOUND,
      );
    }

    booksArray.splice(bookIndex, 1);

    user.books = booksArray.join(', ');

    await this.userRepository.save(user);
    return user;
  }
}
