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
      type: 'mysql',
      host: 'gondola.proxy.rlwy.net',
      port: 33485,
      username:  'root',
      password: 'tnjOQcsfIhDPxMOaSeXSuBKWXMWxylVE',
      database:  'railway',
      entities: [User, Company],
      synchronize: true, // Solo en dev,
      logging: true, // Habilita el registro de consultas y errores,
      
      
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
