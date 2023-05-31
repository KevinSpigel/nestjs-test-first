import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    if (
      !createUserDto.first_name ||
      !createUserDto.email ||
      !createUserDto.password
    ) {
      throw new HttpException('Invalid body format', HttpStatus.BAD_REQUEST);
    }
    const newUser = this.usersService.create(createUserDto);
    return {
      status: 'success',
      payload: newUser,
    };
  }

  @Get()
  findAll(@Query('limit') limit: string = '10') {
    const limitNumber = +limit;
    const users = this.usersService.findAll(limitNumber);
    return {
      status: 'success',
      payload: users,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(+id)) {
      throw new HttpException('Invalid param id', HttpStatus.BAD_REQUEST);
    }
    const user = this.usersService.findOne(+id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      status: 'success',
      payload: user,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
