import { InjectModel } from '@nestjs/mongoose';
import {
  Notification,
  NotificationDocument,
} from './../model/notification.model';
import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, PopulateOptions } from 'mongoose';
import { EntityRepository } from 'src/repository/entity.repository';

@Injectable()
export class NotificationRepository extends EntityRepository<NotificationDocument> {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {
    super(notificationModel);
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
