import { NotificationTypeEnum } from './../notifications/model/notification.model';
import { NotificationsService } from './../notifications/notifications.service';
import { EnquiryRequestData } from './model/enquiryRequest.interface';
import { EnquiryService } from './enquiry.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import mongoose from 'mongoose';

@Controller('enquiry')
export class EnquiryController {
  constructor(
    private enquiryService: EnquiryService,
    private notificationService: NotificationsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-enquiries')
  async getUserEnquiries(@Req() req) {
    return await this.enquiryService.getUserEnquiries(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-user-enquiries')
  async getUserSentEnquiries(@Req() req) {
    return await this.enquiryService.getUserSentEnquiries(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('enquiry/:id')
  async getOneEnquiry(@Param('id') id: string) {
    const result = await Promise.all([
      this.enquiryService.getOneEnquiry(id),
      this.enquiryService.getEnquiryDiscussions(id),
    ]);
    return { enquiry: result[0], discussions: result[1] };
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-enquiry')
  async createEnquiry(@Req() req, @Body() body: EnquiryRequestData) {
    const createdEnquiry = await this.enquiryService.createEnquiry(
      body,
      req.user._id,
      req.user.email,
    );
    await this.notificationService.createNotification(
      'New Enquiry',
      new mongoose.Types.ObjectId(req.user._id),
      new mongoose.Types.ObjectId(body.propertyOwner),
      NotificationTypeEnum['enquiry'],
      new mongoose.Types.ObjectId(body.property),
      createdEnquiry._id,
      body.title,
    );
    return { createdEnquiry };
  }
}
