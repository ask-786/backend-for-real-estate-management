import {
  Controller,
  Get,
  UseGuards,
  Request,
  Patch,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NotificationsService } from './notifications.service';
import { NotificationDocument } from './model/notification.model';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getNotifications(@Request() req): Promise<{
    notifications: NotificationDocument[];
  }> {
    const notifications = await this.notificationsService.getNotifications(
      req.user._id,
    );
    return { notifications };
  }
  @UseGuards(JwtAuthGuard)
  @Get('get-count')
  async getNotificationsCount(@Request() req) {
    const count = await this.notificationsService.getNotificationsCount(
      req.user._id,
    );
    return { count };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async changeReadStatus(@Param('id') id) {
    const resutl = await this.notificationsService.changeReadStatus(id);
    if (resutl.modifiedCount > 0) {
      return { status: true };
    }
  }
}
