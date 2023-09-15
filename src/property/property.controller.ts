import { AwsService } from './aws/aws.service';
import { PropertyService } from './property.service';
import {
  Body,
  Controller,
  Get,
  Param,
  UseGuards,
  Query,
  Put,
  Delete,
  Request,
} from '@nestjs/common';
import {
  coOrdinates as cordType,
  propertyAddressType,
  PropertyDocument,
  propertyType as propType,
} from './model/property.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('property')
export class PropertyController {
  constructor(
    private propertyService: PropertyService,
    private aswService: AwsService,
  ) {}
  @Get()
  getProperties(
    @Query('page') page: number,
    @Query('desc') desc: string,
    @Query('searchValue') searchValue: string,
    @Query('sortValue') sortValue: string,
    @Query('filterValue') filterValue: string,
  ): Promise<PropertyDocument[]> {
    return this.propertyService.getProperties(
      page,
      desc,
      searchValue,
      sortValue,
      filterValue,
    );
  }

  @Get('property/:id')
  getProperty(@Param('id') id: string): Promise<PropertyDocument> {
    return this.propertyService.getProperty(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('property/:id')
  deleteProperty(@Param('id') id: string) {
    return this.propertyService.deleteProperty(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-s3-upload-url')
  getS3UploadUrl() {
    return this.aswService.getS3UploadUrl();
  }

  @UseGuards(JwtAuthGuard)
  @Put('add-property')
  createProperty(
    @Body('title') title: string,
    @Body('price') price: number,
    @Body('description') description: string,
    @Body('tags') tags: string,
    @Body('coOrdinates') coOrdinates: cordType,
    @Body('images') images: string[],
    @Body('propertyType') propertyType: propType,
    @Body('address')
    address: propertyAddressType,
    @Request() req: { user: { _id: any } },
  ) {
    return this.propertyService.createProperty({
      title,
      price,
      description,
      tags: tags,
      coOrdinates,
      images,
      propertyType,
      address,
      owner: req.user._id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-property')
  updateProperty(
    @Body('id') id: string,
    @Body('title') title: string,
    @Body('price') price: number,
    @Body('description') description: string,
    @Body('tags') tags: string,
    @Body('coOrdinates') coOrdinates: cordType,
    @Body('images') images: string[],
    @Body('propertyType') propertyType: propType,
    @Body('address')
    address: propertyAddressType,
    @Request() req: { user: { _id: any } },
  ) {
    if (images) {
      return this.propertyService.updateProperty(id, {
        title,
        price,
        description,
        tags,
        coOrdinates,
        images,
        propertyType,
        address,
        owner: req.user._id,
      });
    } else {
      return this.propertyService.updateProperty(id, {
        title,
        price,
        description,
        tags,
        coOrdinates,
        propertyType,
        address,
        owner: req.user._id,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-own-properties')
  async getOwnProperties(@Request() req: { user: { _id: string } }) {
    return await this.propertyService.getOwnProperties(req.user._id);
  }
}
