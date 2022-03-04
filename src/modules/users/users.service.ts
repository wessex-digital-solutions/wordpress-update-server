import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const registeredUser = await this.usersRepository.findOne({
        username: createUserDto.username,
      });
      if (registeredUser) {
        throw new BadRequestException('Username already exists');
      }
      createUserDto.password = await this.setPassword(createUserDto.password);
      const newUser = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(findConditions: FindConditions<User>): Promise<User> {
    return this.usersRepository.findOneOrFail(findConditions);
  }

  async update(updateUserDto: UpdateUserDto) {
    try {
      const { id, password } = updateUserDto;
      if (password) {
        updateUserDto.password = await this.setPassword(updateUserDto.password);
      }
      await this.usersRepository.update({ id }, updateUserDto);
      return this.findOne({ id });
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.usersRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  private async setPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
