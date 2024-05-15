import { Module } from '@nestjs/common';
import { UsersReservationsService } from './users-reservations.service';
import { UsersReservationsController } from './users-reservations.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
  imports: [
    AuthorizationModule,
    DatabaseModule
  ],
  controllers: [UsersReservationsController],
  providers: [UsersReservationsService, NotificationsService],
})
export class UsersReservationsModule {}
