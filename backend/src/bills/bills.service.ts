import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { DatabaseService } from '../database/database.service';
import { bills, bills_details, dishes, ordered_dishes, reservations, users } from '../../db/schema';
import { ResultBillDto } from './dto/result-bill.dto';
import { Bill, BillState } from './entities/bill.entity';
import { BillDetails } from './entities/bill-details.entity';
import { eq, and } from 'drizzle-orm';
import { UpdateBillDto } from './dto/update-bill.dto';
import { CreateNotificationDto } from '../notifications/dto/create-notification.dto';
import { UserType } from '../authentication/dto/user-data.dto';
import { ReservationsService } from '../reservations/reservations.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class BillsService {

  constructor(
    private databaseService: DatabaseService,
    private reservationsService: ReservationsService,
    private notificationsService: NotificationsService
  ) { }

  isValidBillState(value: string): boolean {
    return Object.values(BillState).includes(value as BillState);
  }

  async create(createBillDto: CreateBillDto): Promise<ResultBillDto> {
    if (!Number.isInteger(createBillDto.id_reservation))
      throw new BadRequestException("Invalid reservation ID");
    if (!Number.isInteger(createBillDto.id_user))
      throw new BadRequestException("Invalid user ID");
    if (!this.isValidBillState(createBillDto.bill_state))
      throw new BadRequestException("Invalid bill state");
    const database = this.databaseService.getDatabase();
    const createBill = {
      id_user: createBillDto.id_user,
      id_reservation: createBillDto.id_reservation,
      date: new Date(createBillDto.date),
      total_bill: createBillDto.total_bill,
      bill_state: createBillDto.bill_state
    }
    let bill: any;
    let tempData: any;
    let billDetails: any[] = [];
    await database.transaction(async (transaction) => {
      try {
        bill = await transaction
          .insert(bills)
          .values(createBill)
          .returning();
        if (createBillDto.id_ordered_dishes !== undefined) {
          for (let index = 0; index < createBillDto.id_ordered_dishes.length; index++) {
            if (!Number.isInteger(createBillDto.id_ordered_dishes[index])) {
              transaction.rollback();
              throw new BadRequestException("Invalid dish ID");
            }
            tempData = await transaction
              .insert(bills_details)
              .values({
                id_ordered_dishes: createBillDto.id_ordered_dishes[index],
                id_bill: bill[0].id
              })
              .returning();
            billDetails.push(tempData);
          }
          bill[0].bill_details = billDetails;
        }
      }
      catch (error) {
        console.log(error)
        transaction.rollback();
        throw new InternalServerErrorException(error.message)
      }
    });
    return {
      result: true,
      message: "Successfully created",
      data: bill
    }
  }

  async findAllByReservationId(idReservation: number): Promise<ResultBillDto> {
    if (!Number.isInteger(idReservation))
      throw new BadRequestException("Invalid reservation ID");
    let data: any;
    let dataDetails: any;
    try {
      const database = this.databaseService.getDatabase();

      data = await database
        .select({
          id: bills.id,
          id_user: bills.id_user,
          name_user: users.name,
          surname_user: users.surname,
          id_reservation: bills.id_reservation,
          date: bills.date,
          total_bill: bills.total_bill,
          bill_state: bills.bill_state
        })
        .from(bills)
        .leftJoin(users, eq(users.id, bills.id_user))
        .where(eq(bills.id_reservation, idReservation));
      for (let index = 0; index < data.length; index++) {
        dataDetails = await database
          .select({
            id: bills_details.id,
            id_ordered_dish: bills_details.id_ordered_dishes,
            name_ordered_dish: dishes.name,
            price_ordered_dish: dishes.price,
            id_bill: bills_details.id_bill
          })
          .from(bills_details)
          .leftJoin(ordered_dishes, eq(ordered_dishes.id, bills_details.id_ordered_dishes))
          .leftJoin(dishes, eq(ordered_dishes.id_dish, dishes.id))
          .where(eq(bills_details.id_bill, data[index].id));
        data[index].bill_details = dataDetails;
      }
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

  async findOne(billId: number) {
    if (!Number.isInteger(billId))
      throw new BadRequestException("Invalid ID");
    let data: any;
    let dataDetails: any;
    try {
      const database = this.databaseService.getDatabase();

      data = await database
        .select({
          id: bills.id,
          id_user: bills.id_user,
          name_user: users.name,
          surname_user: users.surname,
          id_reservation: bills.id_reservation,
          date: bills.date,
          total_bill: bills.total_bill,
          bill_state: bills.bill_state
        })
        .from(bills)
        .leftJoin(users, eq(users.id, bills.id_user))
        .where(eq(bills.id, billId));
      dataDetails = await database
        .select({
          id: bills_details.id,
          id_ordered_dish: bills_details.id_ordered_dishes,
          name_ordered_dish: dishes.name,
          price_ordered_dish: dishes.price,
          id_bill: bills_details.id_bill
        })
        .from(bills_details)
        .leftJoin(ordered_dishes, eq(ordered_dishes.id, bills_details.id_ordered_dishes))
        .leftJoin(dishes, eq(ordered_dishes.id_dish, dishes.id))
        .where(eq(bills_details.id_bill, billId));
      data[0].bill_details = dataDetails;
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

  async didUserPaidOnce(idUser: number, idRestaurant: number): Promise<any> {
    if (!Number.isInteger(idUser))
      throw new BadRequestException("Invalid user ID");
    if (!Number.isInteger(idRestaurant))
      throw new BadRequestException("Invalid restaurant ID");
    let data: any;
    let result: boolean = false;
    try {
      const database = this.databaseService.getDatabase();

      data = await database
        .select()
        .from(bills)
        .leftJoin(reservations, eq(reservations.id, bills.id_reservation))
        .where(
          and(
            eq(bills.id_user, idUser),
            eq(reservations.id_restaurant, idRestaurant)
          )
      );
      if (data.length > 0)
        result = true;
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: result
    }
  }



  async update(id: number, updateBillDto: UpdateBillDto) {
    if (!Number.isInteger(id))
      throw new BadRequestException("Invalid bill ID");
    if (updateBillDto.bill_state !== undefined && !this.isValidBillState(updateBillDto.bill_state))
      throw new BadRequestException("Invalid bill state");
    let data: any;
    try {
      const database = this.databaseService.getDatabase();

      data = await database
        .update(bills)
        .set({
          total_bill: updateBillDto.total_bill,
          bill_state: updateBillDto.bill_state
        })
        .where(eq(bills.id, id))
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Update successful",
      data: data
    }
  }

  async remove(id: number) {
    if (!Number.isInteger(id))
      throw new BadRequestException("Invalid bill ID");
    let data: any;
    try {
      const database = this.databaseService.getDatabase();

      data = await database
        .delete(bills)
        .where(eq(bills.id, id))
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


  async sendNotificationUpdate(reservationId: number, userId: number): Promise<void> {
    try {
      const reservationDetails = await this.reservationsService.findOne(reservationId);
      if (reservationDetails.data[0].id_restaurant !== undefined) {
        const restaurantNotificationDto: CreateNotificationDto = {
          title: "Pagamento effettuato",
          message: "La prenotazione " + reservationId.toString() + " ha ricevuto un pagamento.",
          id_receiver: reservationDetails.data[0].id_restaurant,
          role: UserType.restaurant
        }
        const userNotificationDto: CreateNotificationDto = {
          title: "Inserisci una recensione",
          message: "La prenotazione " + reservationId.toString() + " si è conclusa, inserisci una recensione.",
          id_receiver: userId,
          role: UserType.user
        }
        await this.notificationsService.create(restaurantNotificationDto);
        await this.notificationsService.create(userNotificationDto);
      }
    }
    catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Notification error");
    }
  }
}
