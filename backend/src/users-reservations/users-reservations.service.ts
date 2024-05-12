import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUsersReservationDto } from './dto/create-users-reservation.dto';
import { UpdateUsersReservationDto } from './dto/update-users-reservation.dto';
import { DatabaseService } from '../database/database.service';
import { reservations, restaurants, users, users_reservations } from '../../db/schema';
import { and, eq } from 'drizzle-orm';
import { ResultUsersReservationDto } from './dto/result-users-reservation.dto';
import { InviteUsersReservationDto } from './dto/invite-users-reservation.dto';

@Injectable()
export class UsersReservationsService {
  constructor(
    private databaseService: DatabaseService
  ) { }

  async create(createUsersReservationDto: CreateUsersReservationDto): Promise<ResultUsersReservationDto> {
    if (!Number.isInteger(createUsersReservationDto.id_user))
      throw new BadRequestException("Invalid user ID");
    if (!Number.isInteger(createUsersReservationDto.id_reservation))
      throw new BadRequestException("Invalid reservation ID");
    const database = this.databaseService.getDatabase();
    let data: any;
    try {
      data = await database
        .insert(users_reservations)
        .values(createUsersReservationDto)
        .returning();
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully created",
      data: data
    };
  }


  async invite(inviteUsersDto: InviteUsersReservationDto): Promise<ResultUsersReservationDto> {
    const database = this.databaseService.getDatabase();
    let data: any[] = [];
    let invitedUser: any;
    let foundUser: any;
    try {
      for (let index = 0; index < inviteUsersDto.email_users.length; index++) {
        try {
          foundUser = await database
            .select({
              id_user: users.id,
            })
            .from(users)
            .where(
              eq(users.email, inviteUsersDto.email_users[index]),
            );
        }
        catch (error) {
          console.error(error)
          throw new InternalServerErrorException(error.message)
        }
        if (foundUser.length > 0) {
          const createUsersReservation = {
            id_user: foundUser[0].id_user,
            id_reservation: inviteUsersDto.id_reservation,
            accepted: false
          }
          try {
            invitedUser = await database
              .insert(users_reservations)
              .values(createUsersReservation)
              .returning();
          }
          catch (error) {
            console.error(error)
            throw new InternalServerErrorException(error.message)
          }
          data.push(invitedUser);
        }
      }
    }
    catch (error) {
      console.error(error);
    }
    return {
      result: true,
      message: "Successfully created",
      data: data
    };
  }

  async findAllByUserId(idUser: number): Promise<ResultUsersReservationDto> {
    if (!Number.isInteger(idUser))
      throw new BadRequestException("Invalid user ID");
    const database = this.databaseService.getDatabase();
    let data: any;
    try {
      data = await database
        .select({
          id_user: users_reservations.id_user,
          name_user: users.name,
          surname_user: users.surname,
          id_reservation: users_reservations.id_reservation,
          id_restaurant: restaurants.id,
          name_restaurant: restaurants.name,
          date: reservations.date,
          partecipants: reservations.partecipants,
          state: reservations.reservation_state,
          bill_splitting_method: reservations.bill_splitting_method,
          accepted: users_reservations.accepted
        })
        .from(users_reservations)
        .leftJoin(reservations, eq(reservations.id, users_reservations.id_reservation))
        .leftJoin(restaurants, eq(reservations.id_restaurant, restaurants.id))
        .leftJoin(users, eq(users_reservations.id_user, users.id))
        .where(eq(users_reservations.id_user, idUser));
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successfull",
      data: data
    };
  }

  async findAllByReservationId(idReservation: number): Promise<ResultUsersReservationDto> {
    if (!Number.isInteger(idReservation))
      throw new BadRequestException("Invalid reservation ID");
    const database = this.databaseService.getDatabase();
    let data: any;
    try {
      data = await database
        .select({
          id_user: users_reservations.id_user,
          name_user: users.name,
          surname_user: users.surname,
          id_reservation: users_reservations.id_reservation,
          id_restaurant: restaurants.id,
          name_restaurant: restaurants.name,
          date: reservations.date,
          partecipants: reservations.partecipants,
          state: reservations.reservation_state,
          bill_splitting_method: reservations.bill_splitting_method,
          accepted: users_reservations.accepted
        })
        .from(users_reservations)
        .leftJoin(reservations, eq(reservations.id, users_reservations.id_reservation))
        .leftJoin(restaurants, eq(reservations.id_restaurant, restaurants.id))
        .leftJoin(users, eq(users_reservations.id_user, users.id))
        .where(eq(users_reservations.id_reservation, idReservation));
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successfull",
      data: data
    };
  }


  async findOne(idUser: number, idReservation: number): Promise<ResultUsersReservationDto> {
    if (!Number.isInteger(idReservation))
      throw new BadRequestException("Invalid reservation ID");
    if (!Number.isInteger(idUser))
      throw new BadRequestException("Invalid user ID");
    const database = this.databaseService.getDatabase();
    let data: any;
    try {
      data = await database
        .select({
          id_user: users_reservations.id_user,
          name_user: users.name,
          surname_user: users.surname,
          id_reservation: users_reservations.id_reservation,
          id_restaurant: restaurants.id,
          name_restaurant: restaurants.name,
          date: reservations.date,
          partecipants: reservations.partecipants,
          state: reservations.reservation_state,
          bill_splitting_method: reservations.bill_splitting_method,
          accepted: users_reservations.accepted
        })
        .from(users_reservations)
        .leftJoin(reservations, eq(reservations.id, users_reservations.id_reservation))
        .leftJoin(restaurants, eq(reservations.id_restaurant, restaurants.id))
        .leftJoin(users, eq(users_reservations.id_user, users.id))
        .where(
          and(
            eq(users_reservations.id_reservation, idReservation),
            eq(users_reservations.id_user, idUser)
          )
        );
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successfull",
      data: data
    };
  }

  async update(updateUsersReservationDto: UpdateUsersReservationDto, idUser: number, idReservation: number): Promise<ResultUsersReservationDto> {
    if (!Number.isInteger(idUser))
      throw new BadRequestException("Invalid user ID");
    if (!Number.isInteger(idReservation))
      throw new BadRequestException("Invalid reservation ID");
    const database = this.databaseService.getDatabase();
    let data: any;
    try {
      data = await database
        .update(users_reservations)
        .set({
          accepted: updateUsersReservationDto.accepted
        })
        .where(
          and(
            eq(users_reservations.id_reservation, idReservation),
            eq(users_reservations.id_user, idUser)
          )
        )
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully updated",
      data: data
    }

  }

  async remove(idUser: number, idReservation: number): Promise<ResultUsersReservationDto> {
    if (!Number.isInteger(idUser))
      throw new BadRequestException("Invalid user ID");
    if (!Number.isInteger(idReservation))
      throw new BadRequestException("Invalid reservation ID");
    const database = this.databaseService.getDatabase();
    let data: any;
    try {
      data = await database
        .delete(users_reservations)
        .where(
          and(
            eq(users_reservations.id_reservation, idReservation),
            eq(users_reservations.id_user, idUser)
          )
        )
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully deleted",
      data: data
    }
  }
}
