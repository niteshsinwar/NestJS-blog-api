import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfiguration from "./config.service";
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';

@Module({
  imports: [
  ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfiguration],
  }),
  TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({...configService.get('database')})
  }),  
    AuthModule, PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
