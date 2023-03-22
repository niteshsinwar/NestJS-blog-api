import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}

    async findAll() {
        return this.postRepository.find();
      }
      
      async findOne(id: number) {
        return this.postRepository.findOne({ where: { id } });
      }

      async findSome(username:string){
        return this.postRepository.find({ where: { author: username } });
      }
      
      
     
      async create(username: string, createPostDto: PostDto) {
       
        console.log(username);
        const options: FindOneOptions<User> = { where: { username } };
        const user = await this.userRepository.findOne(options);
        console.log(user);
        const post = this.postRepository.create({ ...createPostDto, author: user.username });
        console.log(post);
        return this.postRepository.save(post);
      }

      
      async update(id: number, username: string, updatePostDto: PostDto) {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
          throw new NotFoundException('Post not found');
        }
        const updatedPost = { ...post, ...updatePostDto };
    
        if (post.author== username) {
          return this.postRepository.save(updatedPost);
        }
        else{
          throw new UnauthorizedException('You are not authorized to update this post');
        }
      }
      
      async delete(id: number, username: string) {
        console.log("query start");
        const post = await this.postRepository.findOne({ where: { id } });
        console.log("query stop");
        if (!post) {
          throw new NotFoundException('Post not found');
        }
        console.log(post);
        console.log(post.author+"=="+username);
        if (post.author== username) {
          return this.postRepository.remove(post);
        }
        else{
          throw new UnauthorizedException('You are not authorized to delete this post');
        }
      }

   
}
