import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Post } from '../entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({ imports: [
  TypeOrmModule.forFeature([Post,User]),
],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
