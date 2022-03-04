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

  async create(createPluginDto: CreatePluginDto): Promise<Plugin> {
    const newPlugin = this.pluginRepository.create({
      ...createPluginDto,
      enabled: true,
    });
    await this.pluginRepository.save(newPlugin);
    return newPlugin;
  }

  async findAll() {
    return this.pluginRepository.find();
  }

  async findOne(id: string): Promise<Plugin> {
    return await this.pluginRepository.findOneOrFail({ id });
  }

  async update(updatePluginDto: UpdatePluginDto): Promise<Plugin> {
    const { id } = updatePluginDto;
    await this.pluginRepository.update({ id }, updatePluginDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.pluginRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
