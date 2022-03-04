import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const newAuthor = this.authorRepository.create(createAuthorDto);
    await this.authorRepository.save(newAuthor);
    return newAuthor;
  }

  async findAll() {
    return this.authorRepository.find();
  }

  async findOne(id: number): Promise<Author> {
    return await this.authorRepository.findOneOrFail({ id });
  }

  async update(updateAuthorDto: UpdateAuthorDto) {
    const { id } = updateAuthorDto;
    await this.authorRepository.update({ id }, updateAuthorDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.authorRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
