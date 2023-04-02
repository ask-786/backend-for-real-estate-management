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
  @Patch('remove-from-favorites')
  async removeFromFavorites(@Request() req, @Body('propertyId') id: string) {
    return await this.favoritesService.removeFromFavorites(id, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-favorites')
  async getFavoriteProperties(@Request() req) {
    return await this.favoritesService.getFavoriteProperties(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-count')
  async getFavoritePropertiesCount(@Request() req) {
    const favorites = await this.favoritesService.getFavoritePropertiesCount(
      req.user._id,
    );
    return { count: favorites.favoriteProperties.length };
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-favorite-ids')
  async getFavoriteIds(@Request() req) {
    return await this.favoritesService.getFavoriteIds(req.user._id);
  }
}
