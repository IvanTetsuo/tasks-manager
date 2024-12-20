import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    HttpException,
    HttpStatus,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { User } from 'src/entities/user.entity';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  
  @ApiTags('Пользователи')
  @UseInterceptors(ClassSerializerInterceptor)
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @ApiOperation({ summary: 'Получить всех пользователей' })
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(JwtAuthGuard)
    @Get('get-all-users')
    async getAllUsers() {
      try {
        return await this.userService.getAllUsers();
      } catch (err) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    }
  
    @Delete('delete-user/:userID')
    async deleteUser(@Param('userID') userID: string) {
      if (!userID) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
      try {
        return await this.userService.deleteUser(userID);
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.FORBIDDEN);
      }
    }
  
    //при ошибке, статус 200
    @Get('get-by/:userID')
    async getUserById(@Param('userID') userID: string) {
      if (!userID) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
      try {
        return await this.userService.getUserById(userID);
      } catch (err) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    }
  
    @Patch('update-self/:userID')
    async updateUserById(
      @Param('userID') userID: string,
      @Body() userDto: CreateUserDto,
    ) {
      try {
        return await this.userService.updateUserById(userID, userDto);
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
  