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

// Configuración de base de datos con logging
const dbHost = process.env.MYSQLHOST || process.env.RAILWAY_TCP_PROXY_DOMAIN || process.env.MYSQL_HOST;
const dbPort = parseInt(
  process.env.MYSQLPORT || 
  process.env.RAILWAY_TCP_PROXY_PORT || 
  process.env.MYSQL_PORT || 
  '3306', 
  10
);
const dbUsername = process.env.MYSQLUSER || process.env.MYSQL_ROOT_USER || process.env.MYSQL_USER || 'root';
const dbPassword = process.env.MYSQL_ROOT_PASSWORD || process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || '';
const dbDatabase = process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || 'railway';

// Log de configuración para diagnóstico
console.log('📊 Database Configuration:', {
  host: dbHost || 'NOT SET - will use localhost (ERROR!)',
  port: dbPort,
  username: dbUsername,
  database: dbDatabase,
  passwordSet: !!dbPassword,
  nodeEnv: process.env.NODE_ENV,
});

if (!dbHost && process.env.NODE_ENV === 'production') {
  console.error('❌ ERROR: MYSQLHOST not set! Railway should provide this automatically if MySQL service is connected.');
  console.log('Available env vars:', Object.keys(process.env).filter(key => key.includes('MYSQL') || key.includes('RAILWAY')));
}

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: dbHost || 'localhost',
      port: dbPort,
      username: dbUsername,
      password: dbPassword,
      database: dbDatabase,
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
