import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({

  imports: [

    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || (() => {
        if (process.env.NODE_ENV === 'production') {
          throw new Error('JWT_SECRET must be set in production');
        }
        return 'dev-secret-change-in-production';
      })(),
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
