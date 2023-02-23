import { PropertyService } from './property.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  coOrdinates as cordType,
  propertyAddressType,
  PropertyDocument,
  propertyType as propType,
} from './model/property.model';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}
  @Get()
  getProperties(): Promise<PropertyDocument[]> {
    return this.propertyService.getProperties();
  }

  @Get('/:id')
  getProperty(@Param('id') id: string): Promise<PropertyDocument> {
    return this.propertyService.getProperty(id);
  }

  @Post('add-property')
  createProperty(
    @Body('title') title: string,
    @Body('price') price: number,
    @Body('description') description: string,
    @Body('tags') tags: string[],
    @Body('coOrdinates') coOrdinates: cordType,
    @Body('images') images: string[],
    @Body('propertyType') propertyType: propType,
    @Body('owner') owner: string,
    @Body('address')
    address: propertyAddressType,
  ) {
    return this.propertyService.createProperty({
      title,
      price,
      description,
      tags,
      coOrdinates,
      images,
      propertyType,
      owner,
      address,
    });
  }
}
