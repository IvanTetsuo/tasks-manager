import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userData: User) {
    return this.authService.login(userData);
  }

  @Post('/registration')
  registration(@Body() userData: CreateUserDto) {
    // try catch сделать
    return this.authService.registration(userData);
  }
}
