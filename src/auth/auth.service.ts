import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { compare } from 'bcrypt';
import { User } from '../entities/user.entity';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,FindOneOptions } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: AuthDto): Promise<User> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(signupDto.password, salt);

    const user = new User();
    user.username = signupDto.username;
    user.password = hashedPassword;
    return this.userRepository.save(user);
  }

  async login(loginDto: AuthDto): Promise<string> {
    const { username, password } = loginDto;
    const user = await this.findByUsername(username);
    if (!user) {
      return null;
    }
    const match = await compare(password, user.password);
    if (!match) {
      return null;
    }
    const payload = { username: user.username };
    const token = this.jwtService.sign(payload);
    return token;
  }
  async findByUsername(username: string): Promise<User> {
    const options: FindOneOptions<User> = { where: { username } };
    return await this.userRepository.findOne(options);
  }

  async validateUser(username): Promise<User> {
    
    const user = await this.findByUsername(username);
    return user;
  }
}
