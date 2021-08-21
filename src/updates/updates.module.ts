import { Module } from '@nestjs/common';
import { UpdatesService } from './updates.service';
import { UpdatesController } from './updates.controller';

@Module({
  controllers: [UpdatesController],
  providers: [UpdatesService],
})
export class UpdatesModule {}
