import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}


@Get()
async findAll() {
  return this.postService.findAll();
}



@Get('dashboard')
async findSome(@Req() req) {
  return this.postService.findSome(req.query.username);
}

@Get(':id')
async findOne(@Param('id') id: number) {
  return this.postService.findOne(id);
}


@UseGuards(JwtAuthGuard)
@Post()
async create(@Req() req, @Body() createPostDto: PostDto) {
  return this.postService.create(req.query.username, createPostDto);
}

@UseGuards(JwtAuthGuard)
@Put(':id')
async update(@Req() req, @Param('id') id: number, @Body() updatePostDto: PostDto) {
  return this.postService.update(id, req.query.username, updatePostDto);
}


@UseGuards(JwtAuthGuard)
@Delete(':id')
async delete(@Req() req, @Param('id') id: number) {
  console.log(req.query.username);
  return this.postService.delete(id, req.query.username);
}



}
