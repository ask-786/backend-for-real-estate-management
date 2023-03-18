import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { FavoritesService } from './favorites.service';
import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('add-to-favorites')
  async addToFavorites(@Request() req, @Body('propertyId') id: string) {
    return await this.favoritesService.addToFavorites(id, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-favorites')
  async getFavoriteProperties(@Request() req) {
    return await this.favoritesService.getFavoriteProperties(req.user._id);
  }
}
