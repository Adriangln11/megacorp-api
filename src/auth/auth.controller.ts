import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'The user has been created successfully.',
    type: CreateUserDto,
  })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  registerUser(@Body() user: CreateUserDto) {
    return this.authService.registerUser(user);
  }
}
