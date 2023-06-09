import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  users: User[];
  constructor() {
    this.users = []
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(limit: number) {
    const users = this.users.slice(limit-1)
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user)=> user.id == id )
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
