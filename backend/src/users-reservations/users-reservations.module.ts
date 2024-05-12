import { Module } from '@nestjs/common';
import { UsersReservationsService } from './users-reservations.service';
import { UsersReservationsController } from './users-reservations.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthorizationModule } from '../authorization/authorization.module';

@Module({
  imports: [
    AuthorizationModule,
    DatabaseModule
  ],
  controllers: [UsersReservationsController],
  providers: [UsersReservationsService],
})
export class UsersReservationsModule {}
