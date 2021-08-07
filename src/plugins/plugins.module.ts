import { Module } from '@nestjs/common';
import { PluginsService } from './plugins.service';
import { PluginsController } from './plugins.controller';
import { Plugin } from './entities/plugin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Plugin])],
  controllers: [PluginsController],
  providers: [PluginsService],
})
export class PluginsModule {}
