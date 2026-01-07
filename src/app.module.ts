import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Company } from './company.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { MetaadsModule } from './metaads/metaads.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'mysql',



      //railway: {
    
    host: 'gondola.proxy.rlwy.net',
      port: 33485,
      username:  'root',
      password: 'tnjOQcsfIhDPxMOaSeXSuBKWXMWxylVE',
      database:  'railway',


//local

/*
      host: 'localhost',
      port: 3306,
      username:  'root',
      password: 'root',
      database:  'db',
*/

      entities: [User, Company],
      synchronize: true, // Solo en dev,
      logging: true, // Habilita el registro de consultas y errores,
      
      
    }),
    TypeOrmModule.forFeature([User, Company]),
    UsersModule,
    AuthModule,
    CompanyModule,
    MetaadsModule,



  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
