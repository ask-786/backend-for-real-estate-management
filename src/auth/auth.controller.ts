import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async postSignup(
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('password') password: string,
  ) {
    return await this.authService.registerUser({
      firstname,
      lastname,
      email,
      phone,
      password,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async postLogin(@Req() req: any) {
    return this.authService.login(req.user);
  }
}
