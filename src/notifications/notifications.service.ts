import {
  NotificationDocument,
  NotificationTypeEnum,
} from './model/notification.model';
import { NotificationRepository } from './repository/notification.repository';
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class NotificationsService {
  constructor(private notificationRepository: NotificationRepository) {}

  async createNotification(
    content: string,
    from: mongoose.Types.ObjectId,
    user: mongoose.Types.ObjectId,
    type: NotificationTypeEnum,
    property: mongoose.Types.ObjectId,
  ): Promise<NotificationDocument> {
    const hello = await this.notificationRepository.create({
      content,
      from,
      user,
      type,
      property,
    });
    console.log(hello);
    return hello;
  }
}
