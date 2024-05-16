import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersReservationsModule } from '../users-reservations/users-reservations.module';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersReservationsService } from '../users-reservations/users-reservations.service';

@Module({
  imports: [
    AuthorizationModule,
    DatabaseModule,
    NotificationsModule,
    UsersReservationsModule,
  ],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    NotificationsService,
    UsersReservationsService
  ],
})
export class ReservationsModule {}
