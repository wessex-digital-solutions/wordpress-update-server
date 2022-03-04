import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { Theme } from './entities/theme.entity';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
  ) {}

  async create(createThemeDto: CreateThemeDto) {
    const newTheme = this.themeRepository.create({
      ...createThemeDto,
      enabled: true,
    });
    await this.themeRepository.save(newTheme);
    return newTheme;
  }

  findAll() {
    return this.themeRepository.find();
  }

  async findOne(id: string): Promise<Theme> {
    return await this.themeRepository.findOneOrFail({ id });
  }

  async update(updateThemeDto: UpdateThemeDto) {
    const { id } = updateThemeDto;
    await this.themeRepository.update({ id }, updateThemeDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.themeRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
