import { PropertySchema } from './model/property.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService],
  imports: [
    MongooseModule.forFeature([{ name: 'Property', schema: PropertySchema }]),
  ],
})
export class PropertyModule {}
