import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';

@Controller('property')
export class PropertyController {
  @Get('hello')
  @UseGuards(JwtAuthGuard)
  hello(@Req() req) {
    console.log(req.user);
  }
}
