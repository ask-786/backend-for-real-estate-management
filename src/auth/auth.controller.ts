import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserDocument } from 'src/users/model/user.model';
import { ApiOperation } from '@nestjs/swagger';
import { UserLoginDto, UserReginstrationDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'User Signup', description: 'Registers a new user' })
  async postSignup(@Body() body: UserReginstrationDto) {
    return this.authService.registerUser({ ...body });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  postLogin(@Req() req: Request, @Body() body: UserLoginDto) {
    return this.authService.login(req.user as UserDocument);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check-auth')
  checkAuth(@Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    return { user: req.user, token: token };
  }
}
