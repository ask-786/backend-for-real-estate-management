import { EntityRepository } from 'src/database/entity.repository';
import { InjectModel } from '@nestjs/mongoose';
import {
  Notification,
  NotificationDocument,
} from './../model/notification.model';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class NotificationRepository extends EntityRepository<NotificationDocument> {
  constructor(
    @InjectModel(Notification.name)
    notificationModel: Model<NotificationDocument>,
  ) {
    super(notificationModel);
  }
}
