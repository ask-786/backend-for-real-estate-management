import { User } from 'src/users/model/user.model';
import {
  NotificationDocument,
  NotificationTypeEnum,
} from './model/notification.model';
import { NotificationRepository } from './repository/notification.repository';
import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Property } from 'src/property/model/property.model';
import { Enquiry } from 'src/enquiry/model/enquiry.model';

@Injectable()
export class NotificationsService {
  constructor(private notificationRepository: NotificationRepository) {}

  async createNotification(
    title: string,
    from: mongoose.Types.ObjectId,
    user: mongoose.Types.ObjectId,
    type: NotificationTypeEnum,
    property: mongoose.Types.ObjectId,
    enquiry: string,
    content?: string,
  ): Promise<NotificationDocument> {
    return await this.notificationRepository.create({
      title,
      content,
      from,
      user,
      type,
      enquiry,
      property,
    });
  }

  async getNotifications(id: string): Promise<NotificationDocument[]> {
    return await this.notificationRepository.findAndPopulate(
      {
        user: new mongoose.Types.ObjectId(id),
      },
      [
        { path: 'from', model: User.name },
        { path: 'property', model: Property.name },
        { path: 'enquiry', model: Enquiry.name },
      ],
    );
  }

  async getNotificationsCount(id: string): Promise<number> {
    return await this.notificationRepository.count({
      user: new mongoose.Types.ObjectId(id),
      readStatus: false,
    });
  }

  async changeReadStatus(
    id: string,
  ): Promise<ReturnType<(typeof Model)['updateOne']>> {
    return await this.notificationRepository.updateOne(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      { $set: { readStatus: true } },
    );
  }
}
