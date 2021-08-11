import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePluginDto } from './dto/create-plugin.dto';
import { UpdatePluginDto } from './dto/update-plugin.dto';
import { Plugin } from './entities/plugin.entity';

@Injectable()
export class PluginsService {
  constructor(
    @InjectRepository(Plugin)
    private readonly pluginRepository: Repository<Plugin>,
  ) {}

  create(createPluginDto: CreatePluginDto) {
    const plugin = new Plugin();
    plugin.name = createPluginDto.name;
    plugin.description = createPluginDto.description;
    plugin.version = createPluginDto.version;
    plugin.author = createPluginDto.author;
    plugin.license = createPluginDto.license;
    plugin.homepage = createPluginDto.homepage;
    plugin.repository = createPluginDto.repository;
    plugin.enabled = true;
    plugin.keywords = createPluginDto.keywords;
    return this.pluginRepository.save(plugin);
  }

  findAll() {
    return `This action returns all plugins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plugin`;
  }

  update(id: number, updatePluginDto: UpdatePluginDto) {
    const plugin = new Plugin();
    plugin.name = updatePluginDto.name;
    plugin.description = updatePluginDto.description;
    return `This action updates a #${id} plugin`;
  }

  remove(id: number) {
    return `This action removes a #${id} plugin`;
  }
}
