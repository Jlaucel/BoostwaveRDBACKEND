import { Module } from '@nestjs/common';
import { MetaadsService } from './metaads.service';
import { MetaadsController } from './metaads.controller';

@Module({
  providers: [MetaadsService],
  controllers: [MetaadsController]
})
export class MetaadsModule {}
