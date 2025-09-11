import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Company } from './company.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'DB',
      entities: [User, Company],
      synchronize: false, // Solo en dev
    }),
    TypeOrmModule.forFeature([User, Company]),
    UsersModule,
    AuthModule,
    CompanyModule,



  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
