import { EntityRepository } from 'src/database/entity.repository';
import { InjectModel } from '@nestjs/mongoose';
import {
  Notification,
  NotificationDocument,
} from './../model/notification.model';
import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, PopulateOptions } from 'mongoose';

@Injectable()
export class NotificationRepository extends EntityRepository<NotificationDocument> {
  notificationModel: Model<NotificationDocument>;
  constructor(
    @InjectModel(Notification.name)
    notificationModel: Model<NotificationDocument>,
  ) {
    super(notificationModel);
    this.notificationModel = notificationModel;
  }

  async findAndPopulate(
    enquiryFinterQuery: FilterQuery<NotificationDocument>,
    populateOptions: PopulateOptions[],
  ) {
    return await this.notificationModel
      .find(enquiryFinterQuery)
      .populate(populateOptions);
  }
}
