import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUpdateDto } from './dto/create-update.dto';
import { UpdateUpdateDto } from './dto/update-update.dto';
import { Update } from './entities/update.entity';

@Injectable()
export class UpdatesService {
  constructor(
    @InjectRepository(Update)
    private readonly updateRepository: Repository<Update>,
  ) {}

  async create(createUpdateDto: CreateUpdateDto): Promise<Update> {
    const newUpdate = this.updateRepository.create(createUpdateDto);
    await this.updateRepository.save(newUpdate);
    return newUpdate;
  }

  async findAll(): Promise<Update[]> {
    return await this.updateRepository.find();
  }

  async findOne(id: string): Promise<Update> {
    return await this.updateRepository.findOneOrFail({ id });
  }

  async update(updateUpdateDto: UpdateUpdateDto) {
    const { id } = updateUpdateDto;
    await this.updateRepository.update({ id }, updateUpdateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.updateRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
