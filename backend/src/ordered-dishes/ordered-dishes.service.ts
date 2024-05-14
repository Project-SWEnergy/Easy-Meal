import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderedDishDto } from './dto/create-ordered-dish.dto';
import { UpdateOrderedDishDto } from './dto/update-ordered-dish.dto';
import { DatabaseService } from '../database/database.service';
import { dishes, dishes_ingredients, ingredients, ordered_dishes, removed_ingredients, users } from '../../db/schema';
import { ResultOrderedDishDto } from './dto/result-ordered-dish.dto';
import { eq, and, count, sum } from 'drizzle-orm';
import { OrderedDish } from './entities/ordered-dish.entity';
import { ReservationsService } from '../reservations/reservations.service';
import { CreateNotificationDto } from '../notifications/dto/create-notification.dto';
import { UserType } from '../authentication/dto/user-data.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class OrderedDishesService {

  constructor(
    private databaseService: DatabaseService,
    private reservationsService: ReservationsService,
    private notificationsService: NotificationsService
  ) { }

  async create(createOrderedDishDto: CreateOrderedDishDto[]) {
    let dataList: any[] = [];
    try {
      const database = this.databaseService.getDatabase();
      await database.transaction(async (transaction) => {
        let data: any;
        for (let i = 0; i < createOrderedDishDto.length; i++) {
          try {
            data = await transaction
              .insert(ordered_dishes)
              .values({
                id_user: createOrderedDishDto[i].id_user,
                id_reservation: createOrderedDishDto[i].id_reservation,
                id_dish: createOrderedDishDto[i].id_dish,
                paid: createOrderedDishDto[i].paid
              })
              .returning();
          }
          catch (error) {
            console.log(error)
            transaction.rollback();
            throw new InternalServerErrorException(error.message)
          }
          const removedIngredients = createOrderedDishDto[i].removed_ingredients;
          try {
            let removed_ingredient: any;
            for (let j = 0; j < removedIngredients.length; j++) {
              removed_ingredient = await transaction
                .insert(removed_ingredients)
                .values({
                  id_ordered_dish: data[0].id,
                  id_ingredient: removedIngredients[j]
                })
                .returning();
            }
          }
          catch (error) {
            console.log(error)
            transaction.rollback();
            throw new InternalServerErrorException(error.message)
          }
          dataList.push(data);
        }
      })
    }
    catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
    return {
      result: true,
      message: "Successfully created",
      data: dataList
    }
  }

  async findAllByReservationId(idReservation: number): Promise<ResultOrderedDishDto> {
    if (!Number.isInteger(idReservation))
      throw new BadRequestException("Invalid reservation ID");
    let data: OrderedDish[];
    try {
      const database = this.databaseService.getDatabase();
      data = await database
        .select({
          id: ordered_dishes.id,
          id_ordered_dish: ordered_dishes.id,
          id_user: ordered_dishes.id_user,
          name_user: users.name,
          surname_user: users.surname,
          id_reservation: ordered_dishes.id_reservation,
          id_dish: ordered_dishes.id_dish,
          name_dish: dishes.name,
          image_dish: dishes.image,
          price_dish: dishes.price,
          paid: ordered_dishes.paid,
        })
        .from(ordered_dishes)
        .leftJoin(users, eq(users.id, ordered_dishes.id_user))
        .leftJoin(dishes, eq(dishes.id, ordered_dishes.id_dish))
        .where(eq(ordered_dishes.id_reservation, idReservation));
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    for (let index = 0; index < data.length; index++) {
      data[index].removed_ingredients = await this.findRemovedIngredients(data[index]);
    }
    return {
      result: true,
      message: "Research successful",
      data: data
    }
  }

  async findAllByUserId(idUser: number, idReservation: number): Promise<ResultOrderedDishDto> {
    if (!Number.isInteger(idUser))
      throw new BadRequestException("Invalid user ID");
    if (!Number.isInteger(idReservation))
      throw new BadRequestException("Invalid reservation ID");
    let data: any;
    try {
      const database = this.databaseService.getDatabase();
      data = await database
        .select({
          id: ordered_dishes.id,
          id_user: ordered_dishes.id_user,
          name_user: users.name,
          surname_user: users.surname,
          id_reservation: ordered_dishes.id_reservation,
          id_dish: ordered_dishes.id_dish,
          name_dish: dishes.name,
          image_dish: dishes.image,
          price_dish: dishes.price,
          paid: ordered_dishes.paid
        })
        .from(ordered_dishes)
        .leftJoin(users, eq(users.id, ordered_dishes.id_user))
        .leftJoin(dishes, eq(dishes.id, ordered_dishes.id_dish))
        .where(
          and(
            eq(ordered_dishes.id_user, idUser),
            eq(ordered_dishes.id_reservation, idReservation)
          )
        );
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    for (let index = 0; index < data.length; index++) {
      data[index].removed_ingredients = await this.findRemovedIngredients(data[index]);
    }
    return {
      result: true,
      message: "Research successful",
      data: data
    }
  }

  async findAllUnpaidOrders(idReservation: number): Promise<ResultOrderedDishDto> {
    if (!Number.isInteger(idReservation))
      throw new BadRequestException("Invalid reservation ID");
    let data: OrderedDish[];
    try {
      const database = this.databaseService.getDatabase();
      data = await database
        .select({
          id: ordered_dishes.id,
          id_ordered_dish: ordered_dishes.id,
          id_user: ordered_dishes.id_user,
          name_user: users.name,
          surname_user: users.surname,
          id_reservation: ordered_dishes.id_reservation,
          id_dish: ordered_dishes.id_dish,
          name_dish: dishes.name,
          image_dish: dishes.image,
          price_dish: dishes.price,
          paid: ordered_dishes.paid,
        })
        .from(ordered_dishes)
        .leftJoin(users, eq(users.id, ordered_dishes.id_user))
        .leftJoin(dishes, eq(dishes.id, ordered_dishes.id_dish))
        .where(
          and(
            eq(ordered_dishes.id_reservation, idReservation),
            eq(ordered_dishes.paid, false)
          )
        );
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    for (let index = 0; index < data.length; index++) {
      data[index].removed_ingredients = await this.findRemovedIngredients(data[index]);
    }
    return {
      result: true,
      message: "Research successful",
      data: data
    }
  }

  async findAllUnpaidOrdersByUserId(idUser: number, idReservation: number): Promise<ResultOrderedDishDto> {
    if (!Number.isInteger(idReservation))
      throw new BadRequestException("Invalid reservation ID");
    if (!Number.isInteger(idUser))
      throw new BadRequestException("Invalid user ID");
    let data: OrderedDish[];
    try {
      const database = this.databaseService.getDatabase();
      data = await database
        .select({
          id: ordered_dishes.id,
          id_ordered_dish: ordered_dishes.id,
          id_user: ordered_dishes.id_user,
          name_user: users.name,
          surname_user: users.surname,
          id_reservation: ordered_dishes.id_reservation,
          id_dish: ordered_dishes.id_dish,
          name_dish: dishes.name,
          image_dish: dishes.image,
          price_dish: dishes.price,
          paid: ordered_dishes.paid,
        })
        .from(ordered_dishes)
        .leftJoin(users, eq(users.id, ordered_dishes.id_user))
        .leftJoin(dishes, eq(dishes.id, ordered_dishes.id_dish))
        .where(
          and(
            eq(ordered_dishes.id_reservation, idReservation),
            eq(ordered_dishes.paid, false),
            eq(ordered_dishes.id_user, idUser)
          )
        );
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    for (let index = 0; index < data.length; index++) {
      data[index].removed_ingredients = await this.findRemovedIngredients(data[index]);
    }
    return {
      result: true,
      message: "Research successful",
      data: data
    }
  }

  async findOne(id: number): Promise<ResultOrderedDishDto> {
    if (!Number.isInteger(id))
      throw new BadRequestException("Invalid ID");
    let data: any;
    try {
      const database = this.databaseService.getDatabase();
      data = await database
        .select({
          id: ordered_dishes.id,
          id_user: ordered_dishes.id_user,
          name_user: users.name,
          surname_user: users.surname,
          id_reservation: ordered_dishes.id_reservation,
          id_dish: ordered_dishes.id_dish,
          name_dish: dishes.name,
          image_dish: dishes.image,
          price_dish: dishes.price,
          paid: ordered_dishes.paid
        })
        .from(ordered_dishes)
        .leftJoin(users, eq(users.id, ordered_dishes.id_user))
        .leftJoin(dishes, eq(dishes.id, ordered_dishes.id_dish))
        .where(eq(ordered_dishes.id, id));
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    for (let index = 0; index < data.length; index++) {
      data[index].removed_ingredients = await this.findRemovedIngredients(data[index]);
    }
    return {
      result: true,
      message: "Research successful",
      data: data
    }
  }

  async findRemovedIngredients(data: any) {
    let removedIngredients: any;
    try {
      const database = this.databaseService.getDatabase();
      removedIngredients = await database
        .select({
          id_ingredient: removed_ingredients.id_ingredient,
          name_ingredient: ingredients.name
        })
        .from(removed_ingredients)
        .leftJoin(ingredients, eq(ingredients.id, removed_ingredients.id_ingredient))
        .where(eq(removed_ingredients.id_ordered_dish, data.id));
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return removedIngredients;
  }

  async update(idOrder: number, updateOrderedDishDto: UpdateOrderedDishDto): Promise<ResultOrderedDishDto> {
    if (!Number.isInteger(idOrder))
      throw new BadRequestException("Invalid order ID");
    let modifiedDish: any;
    try {
      const database = this.databaseService.getDatabase();
      modifiedDish = await database
        .update(ordered_dishes)
        .set({
          paid: updateOrderedDishDto.paid,
        })
        .where(eq(ordered_dishes.id, idOrder))
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Update successful",
      data: modifiedDish
    }
  }

  async remove(idUser: number, idReservation: number) {
    if (!Number.isInteger(idUser))
      throw new BadRequestException("Invalid user ID");
    if (!Number.isInteger(idReservation))
      throw new BadRequestException("Invalid reservation ID");
    const database = this.databaseService.getDatabase();
    let data: any;
    let orderedDishes: any;
    await database.transaction(async (transaction) => {
      try {
        orderedDishes = await database
          .select({ id: ordered_dishes.id })
          .from(ordered_dishes)
          .where(
            and(
              eq(ordered_dishes.id_user, idUser),
              eq(ordered_dishes.id_reservation, idReservation)
            )
          );
        for (let j = 0; j < orderedDishes.length; j++) {
          await database
            .delete(removed_ingredients)
            .where(eq(removed_ingredients.id_ordered_dish, ordered_dishes[j]))
            .returning();
        }
        data = await database
          .delete(ordered_dishes)
          .where(
            and(
              eq(ordered_dishes.id_user, idUser),
              eq(ordered_dishes.id_reservation, idReservation)
            )
          )
          .returning();
      }
      catch (error) {
        console.log(error)
        transaction.rollback();
        throw new InternalServerErrorException(error.message)
      }
    });
    return {
      result: true,
      message: "Successfully deleted",
      data: data
    }
  }

  async reservationTotalBill(idReservation: number): Promise<ResultOrderedDishDto> {
    if (!Number.isInteger(idReservation))
      throw new BadRequestException("Invalid reservation ID");
    let data: any;
    try {
      const database = this.databaseService.getDatabase();
      data = await database
        .select({
          id_reservation: ordered_dishes.id_reservation,
          total_bill: sum(dishes.price)
        })
        .from(ordered_dishes)
        .leftJoin(dishes, eq(dishes.id, ordered_dishes.id_dish))
        .where(eq(ordered_dishes.id_reservation, idReservation))
        .groupBy(ordered_dishes.id_reservation);
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: data
    }
  }

  async userTotalBill(idUser: number, idReservation: number): Promise<ResultOrderedDishDto> {
    if (!Number.isInteger(idReservation))
      throw new BadRequestException("Invalid reservation ID");
    if (!Number.isInteger(idUser))
      throw new BadRequestException("Invalid user ID");
    let data: any;
    try {
      const database = this.databaseService.getDatabase();
      data = await database
        .select({
          id_reservation: ordered_dishes.id_reservation,
          id_user: ordered_dishes.id_user,
          total_bill: sum(dishes.price)
        })
        .from(ordered_dishes)
        .leftJoin(dishes, eq(dishes.id, ordered_dishes.id_dish))
        .where(
          and(
            eq(ordered_dishes.id_reservation, idReservation),
            eq(ordered_dishes.id_user, idUser)
          )
        )
        .groupBy(ordered_dishes.id_reservation, ordered_dishes.id_user);
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: data
    }
  }

  async removeById(orderId: number) {
    if (!Number.isInteger(orderId))
      throw new BadRequestException("Invalid order ID");
    let data: any;
    try {
      const database = this.databaseService.getDatabase();
      data = await database
        .delete(ordered_dishes)
        .where(eq(ordered_dishes.id, orderId))
        .returning()
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


  async sendNotificationUpdate(reservationId: number): Promise<void> {
    try {
      const reservationDetails = await this.reservationsService.findOne(reservationId);
      if (reservationDetails.data[0].id_restaurant !== undefined) {
        const restaurantNotificationDto: CreateNotificationDto = {
          title: "Nuova ordinazione",
          message: "La tua prenotazione " + reservationId.toString() + " ha un nuovo ordine",
          id_receiver: reservationDetails.data[0].id_restaurant,
          role: UserType.restaurant
        }
        this.notificationsService.create(restaurantNotificationDto);
      }
    }
    catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }


}
