import { PartialType } from '@nestjs/swagger';
import { CreateUsersReservationDto } from './create-users-reservation.dto';

export class UpdateUsersReservationDto extends PartialType(CreateUsersReservationDto) {}
