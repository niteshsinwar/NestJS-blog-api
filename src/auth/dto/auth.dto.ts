import { IsString, MinLength, MaxLength, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Post } from 'src/entities/post.entity';

export class AuthDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ValidateNested({ each: true })
  @Type(() => Post)
  posts: Post[];
}