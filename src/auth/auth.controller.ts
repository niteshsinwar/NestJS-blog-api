import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signupDto: AuthDto) {
    return this.authService.signup(signupDto);
  }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() loginDto: AuthDto) {
    return this.authService.login(loginDto);
  }
 
}
