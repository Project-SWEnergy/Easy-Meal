import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  imports: [
    AuthorizationModule,
    DatabaseModule
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, NotificationsService],
})
export class ReviewsModule {}
