import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Company } from './company/company.entity';
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
      host: process.env.MYSQLHOST || process.env.RAILWAY_TCP_PROXY_DOMAIN || 'localhost',
      port: parseInt(process.env.MYSQLPORT || process.env.RAILWAY_TCP_PROXY_PORT || '3306', 10),
      username: process.env.MYSQLUSER || process.env.MYSQL_ROOT_USER || 'root',
      password: process.env.MYSQL_ROOT_PASSWORD || process.env.MYSQLPASSWORD || '',
      database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || 'railway',
      entities: [User, Company],
      synchronize: process.env.NODE_ENV !== 'production', // Solo en dev
      logging: process.env.NODE_ENV !== 'production', // Habilita el registro de consultas y errores en dev
      extra: {
        connectionLimit: 10,
      },
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
