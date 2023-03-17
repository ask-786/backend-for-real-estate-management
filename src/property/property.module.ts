import { PropertyRepository } from './repository/property.repository';
import { PropertySchema } from './model/property.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { AwsService } from './aws/aws.service';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService, PropertyRepository, AwsService],
  imports: [
    MongooseModule.forFeature([{ name: 'Property', schema: PropertySchema }]),
  ],
  exports: [PropertyService],
})
export class PropertyModule {}
