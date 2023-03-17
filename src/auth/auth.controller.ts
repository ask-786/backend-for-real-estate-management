import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

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
  async postLogin(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check-auth')
  checkAuth(@Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    return { user: req.user, token: token };
  }
}
