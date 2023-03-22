import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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

  async login(user: User) {
    const payload = { sub: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(user: User) {
    const payload = { sub: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  

  
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async findOne(username: string): Promise<User> {
    const options: FindOneOptions<User> = { where: { username } };
    return await this.userRepository.findOne(options);
  }
}
