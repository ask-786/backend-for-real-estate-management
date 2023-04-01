import { NotificationTypeEnum } from './../../notifications/model/notification.model';

export interface EnquiryRequestData {
  title: string;
  content: string;
  topic: NotificationTypeEnum;
  property: string;
  email: string;
  propertyOwner: string;
}
