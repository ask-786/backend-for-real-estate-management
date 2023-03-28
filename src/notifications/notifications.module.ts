import { NotificationSchema } from './model/notification.model';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationRepository } from './repository/notification.repository';
import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationGateway } from './gateway/gateway/gateway.gateway';

@Module({
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationRepository,
    NotificationGateway,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: 'Notification', schema: NotificationSchema },
    ]),
  ],
  exports: [NotificationsService, NotificationRepository, NotificationGateway],
})
export class NotificationsModule {}
