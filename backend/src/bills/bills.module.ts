import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { TransactionLogsService } from 'src/transaction-logs/transaction-logs.service';
import { OrderedDishesService } from 'src/ordered-dishes/ordered-dishes.service';
import { ReservationsService } from 'src/reservations/reservations.service';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { NotificationsService } from 'src/notifications/notifications.service';
import { UsersReservationsService } from 'src/users-reservations/users-reservations.service';

@Module({
  imports: [
    AuthorizationModule,
    DatabaseModule
  ],
  controllers: [BillsController],
  providers: [BillsService, TransactionLogsService, OrderedDishesService, ReservationsService, NotificationsService, UsersReservationsService],
})
export class BillsModule {}
