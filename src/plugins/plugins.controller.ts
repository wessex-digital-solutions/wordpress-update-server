import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PluginsService } from './plugins.service';
import { CreatePluginDto } from './dto/create-plugin.dto';
import { UpdatePluginDto } from './dto/update-plugin.dto';

@Controller('plugins')
export class PluginsController {
  constructor(private readonly pluginsService: PluginsService) {}

  @Post()
  create(@Body() createPluginDto: CreatePluginDto) {
    return this.pluginsService.create(createPluginDto);
  }

  @Get()
  async findAll() {
    return this.pluginsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pluginsService.findOne(id);
  }

  @Patch(':id')
  update(@Body() updatePluginDto: UpdatePluginDto) {
    return this.pluginsService.update(updatePluginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pluginsService.remove(id);
  }
}
