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

  create(createThemeDto: CreateThemeDto) {
    const theme = new Theme();
    theme.name = createThemeDto.name;
    theme.description = createThemeDto.description;
    theme.version = createThemeDto.version;
    return;
  }

  findAll() {
    return this.themeRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} theme`;
  }

  update(id: number, updateThemeDto: UpdateThemeDto) {
    const theme = new Theme();
    theme.name = updateThemeDto.name;
    theme.description = updateThemeDto.description;
    theme.version = updateThemeDto.version;
    return this.themeRepository.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} theme`;
  }
}
