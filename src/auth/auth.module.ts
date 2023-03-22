import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: (process.env.JWT_SECRET || 'my_secret_key'),
      signOptions: { expiresIn: '1d' }, 
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy], 
})
export class AuthModule {}
