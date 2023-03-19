import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

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
}
