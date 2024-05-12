import { Module } from '@nestjs/common';
import { OrderedDishesService } from './ordered-dishes.service';
import { OrderedDishesController } from './ordered-dishes.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { ReservationsService } from '../reservations/reservations.service';
import { ReservationsModule } from '../reservations/reservations.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersReservationsService } from '../users-reservations/users-reservations.service';

@Module({
  imports: [
    AuthorizationModule,
    DatabaseModule,
    ReservationsModule,
    NotificationsModule
  ],
  controllers: [OrderedDishesController],
  providers: [OrderedDishesService, ReservationsService, NotificationsService, UsersReservationsService],
})
export class OrderedDishesModule {}
