import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PropertyModule } from './property/property.module';
import { EnquiryModule } from './enquiry/enquiry.module';
import { FavoritesModule } from './favorites/favorites.module';
import { EnquiryDiscussionModule } from './enquiry-discussion/enquiry-discussion.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.LOCAL_DB),
    AuthModule,
    PropertyModule,
    EnquiryModule,
    FavoritesModule,
    EnquiryDiscussionModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
