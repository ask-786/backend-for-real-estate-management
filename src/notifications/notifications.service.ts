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
    title: string,
    content: string,
    from: mongoose.Types.ObjectId,
    user: mongoose.Types.ObjectId,
    type: NotificationTypeEnum,
    property: mongoose.Types.ObjectId,
  ): Promise<NotificationDocument> {
    const hello = await this.notificationRepository.create({
      title,
      content,
      from,
      user,
      type,
      property,
    });
    return hello;
  }
}
