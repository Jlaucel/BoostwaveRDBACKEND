import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaadsService } from './metaads.service';
import { MetaadsController } from './metaads.controller';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
  providers: [MetaadsService],
  controllers: [MetaadsController],
  exports: [MetaadsService],
})
export class MetaadsModule {}
