import { EnquiryRequestData } from './model/enquiryRequest.interface';
import { EnquiryService } from './enquiry.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

@Controller('enquiry')
export class EnquiryController {
  constructor(private enquiryService: EnquiryService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-enquiries')
  async getUserEnquiries(@Req() req) {
    return await this.enquiryService.getUserEnquiries(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-enquiry')
  async createEnquiry(@Req() req, @Body() body: EnquiryRequestData) {
    const createdEnquiry = await this.enquiryService.createEnquiry(
      body,
      req.user._id,
      req.user.email,
    );
    return { createdEnquiry };
  }
}
