import { User } from 'src/users/model/user.model';
import { Property } from './../../property/model/property.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Favorites {
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: User.name,
    unique: true,
  })
  user: mongoose.Types.ObjectId;

  @Prop([{ type: mongoose.Types.ObjectId, ref: Property.name }])
  favoriteProperties: [mongoose.Types.ObjectId];
}

export const FavoritesSchema = SchemaFactory.createForClass(Favorites);

export type FavoritesDocument = Favorites & mongoose.Document;
