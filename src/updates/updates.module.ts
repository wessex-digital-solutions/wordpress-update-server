import { Module } from '@nestjs/common';
import { UpdatesService } from './updates.service';
import { UpdatesController } from './updates.controller';
import { Update } from './entities/update.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Update])],
  controllers: [UpdatesController],
  providers: [UpdatesService],
})
export class UpdatesModule {}
