import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { DatabaseService } from '../database/database.service';
import { ResultReservationsDto } from './dto/result-reservations.dto';
import { reservations, users_reservations } from '../../db/schema';
import { BillSplittingMethod, ReservationState } from './entities/reservation.entity';
import { eq } from 'drizzle-orm';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateNotificationDto } from '../notifications/dto/create-notification.dto';
import { UserType } from '../authentication/dto/user-data.dto';
import { UsersReservationsService } from '../users-reservations/users-reservations.service';


@Injectable()
export class ReservationsService {

  constructor(
    private databaseService: DatabaseService,
    private notificationService: NotificationsService,
    private usersReservationsService: UsersReservationsService
  ) { }


  isValidBillSplittingMethod(value: string): boolean {
    return Object.values(BillSplittingMethod).includes(value as BillSplittingMethod);
  }

  isValidReservationState(value: string): boolean {
    return Object.values(ReservationState).includes(value as ReservationState);
  }


  async create(createReservationDto: CreateReservationDto): Promise<ResultReservationsDto> {
    if (!this.isValidBillSplittingMethod(createReservationDto.bill_splitting_method))
      throw new BadRequestException("Invalid bill splitting method");
    if (!this.isValidReservationState(createReservationDto.reservation_state))
      throw new BadRequestException("Invalid reservation state");
    try {
      createReservationDto.date = new Date(createReservationDto.date);
    }
    catch {
      throw new BadRequestException("Invalid date format");
    }
    let createdReservation: any;
    try {
      const database = this.databaseService.getDatabase();
      createdReservation = await database
        .insert(reservations)
        .values({
          id_restaurant: createReservationDto.restaurantId,
          date: createReservationDto.date,
          partecipants: createReservationDto.partecipants,
          reservation_state: createReservationDto.reservation_state,
          bill_splitting_method: createReservationDto.bill_splitting_method,
          paid_orders: 0
        })
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully created: Reservation",
      data: createdReservation
    }
  }

  async findAllByRestaurantId(restaurantId: number): Promise<ResultReservationsDto> {
    if (!Number.isInteger(restaurantId))
      throw new BadRequestException("Invalid restaurant ID");
    let foundReservations: any;
    try {
      const database = this.databaseService.getDatabase();
      foundReservations = await database
        .select()
        .from(reservations)
        .where(eq(reservations.id_restaurant, restaurantId));
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: foundReservations
    }
  }

  async findOne(reservationId: number): Promise<ResultReservationsDto> {
    if (!Number.isInteger(reservationId))
      throw new BadRequestException("Invalid reservation ID");
    let foundReservations: any;
    try {
      const database = this.databaseService.getDatabase();

      foundReservations = await database
        .select()
        .from(reservations)
        .where(eq(reservations.id, reservationId));
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: foundReservations
    }
  }

  async update(reservationId: number, updateReservationDto: UpdateReservationDto): Promise<ResultReservationsDto> {
    if (!Number.isInteger(reservationId))
      throw new BadRequestException("Invalid reservation ID");
    if (updateReservationDto.bill_splitting_method != undefined
      && !this.isValidBillSplittingMethod(updateReservationDto.bill_splitting_method))
      throw new BadRequestException("Invalid bill splitting method");
    if (updateReservationDto.reservation_state != undefined
      && !this.isValidReservationState(updateReservationDto.reservation_state))
      throw new BadRequestException("Invalid reservation state");
    try {
      if (updateReservationDto.date !== undefined)
        updateReservationDto.date = new Date(updateReservationDto.date)
    }
    catch {
      throw new BadRequestException("Invalid date format")
    }
    let modifiedReservation: any;
    try {
      const database = this.databaseService.getDatabase();
      modifiedReservation = await database
        .update(reservations)
        .set(updateReservationDto)
        .where(eq(reservations.id, reservationId))
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Update successful",
      data: modifiedReservation
    }
  }


  async remove(reservationId: number): Promise<ResultReservationsDto> {
    if (!Number.isInteger(reservationId))
      throw new BadRequestException("Invalid reservation ID");
    let deletedReservation: any;
    try {
      const database = this.databaseService.getDatabase();
      deletedReservation = await database
        .delete(reservations)
        .where(eq(reservations.id, reservationId))
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully deleted: reservation",
      data: deletedReservation
    }
  }

  async sendNotificationCreate(reservationId: number): Promise<void> {
    try {
      const reservationDetails = await this.findOne(reservationId);
      if (reservationDetails.data[0].id_restaurant !== undefined) {
        const restaurantNotificationDto: CreateNotificationDto = {
          title: "Nuova prenotazione",
          message: "Hai ricevuto una nuova prenotazione con numero: " + reservationId.toString(),
          id_receiver: reservationDetails.data[0].id_restaurant,
          role: UserType.restaurant
        }
        this.notificationService.create(restaurantNotificationDto);
      }
    }
    catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Notification error");
    }
  }


  async sendNotificationUpdate(reservationId: number): Promise<void> {
    try {
      const reservationDetails = await this.findOne(reservationId);
      if (reservationDetails.data[0].id_restaurant !== undefined) {
        const restaurantNotificationDto: CreateNotificationDto = {
          title: "Prenotazione aggiornata",
          message: "La tua prenotazione " + reservationId.toString() + " ha subito una motifica",
          id_receiver: reservationDetails.data[0].id_restaurant,
          role: UserType.restaurant
        }
        this.notificationService.create(restaurantNotificationDto);
      }
      let userNotification: CreateNotificationDto;
      const temp = await this.usersReservationsService.findAllByReservationId(reservationId);
      const usersList = temp[0].data;
      for (let index = 0; index < usersList.length; index++) {
        if (usersList[index].id_user !== undefined) {
          userNotification = {
            title: "Prenotazione aggiornata",
            message: "La tua prenotazione " + reservationId.toString() + " ha subito una motifica",
            id_receiver: usersList[index].id_user,
            role: UserType.user
          }
          this.notificationService.create(userNotification);
        }
      }
    }
    catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Notification error");
    }
  }

}
