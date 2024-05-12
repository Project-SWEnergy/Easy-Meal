import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { DatabaseService } from '../database/database.service';
import { ResultReviewsDto } from './dto/result-review.dto';
import { restaurants, reviews, users } from '../../db/schema';
import { and, eq } from 'drizzle-orm';
import { CreateNotificationDto } from '../notifications/dto/create-notification.dto';
import { UserType } from '../authentication/dto/user-data.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ReviewsService {

  constructor(
    private databaseService: DatabaseService,
    private notificationsService: NotificationsService

  ) { }

  async create(idUser: number, createReviewDto: CreateReviewDto): Promise<ResultReviewsDto> {
    if (!Number.isInteger(idUser))
      throw new BadRequestException("Invalid user ID");
    createReviewDto.id_user = idUser;
    createReviewDto.date = new Date(createReviewDto.date);
    const database = this.databaseService.getDatabase();
    let data: any;
    try {
      data = await database
        .insert(reviews)
        .values(createReviewDto)
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

  async findAllByRestaurantId(idRestaurant: number) {
    if (!Number.isInteger(idRestaurant))
      throw new BadRequestException("Invalid restaurant ID");
    const database = this.databaseService.getDatabase();
    let data: any;
    try {
      data = await database
        .select({
          id_restaurant: reviews.id_restaurant,
          name_restaurant: restaurants.name,
          id_user: reviews.id_user,
          name_user: users.name,
          date: reviews.date,
          score: reviews.score,
          description: reviews.description
        })
        .from(reviews)
        .leftJoin(restaurants, eq(reviews.id_restaurant, restaurants.id))
        .leftJoin(users, eq(reviews.id_user, users.id))
        .where(eq(reviews.id_restaurant, idRestaurant));
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

  async findAllByUserId(idUser: number) {
    if (!Number.isInteger(idUser))
      throw new BadRequestException("Invalid user ID");
    const database = this.databaseService.getDatabase();
    let data: any;
    try {
      data = await database
        .select({
          id_restaurant: reviews.id_restaurant,
          name_restaurant: restaurants.name,
          id_user: reviews.id_user,
          name_user: users.name,
          date: reviews.date,
          score: reviews.score,
          description: reviews.description
        })
        .from(reviews)
        .leftJoin(restaurants, eq(reviews.id_restaurant, restaurants.id))
        .leftJoin(users, eq(reviews.id_user, users.id))
        .where(eq(reviews.id_user, idUser));
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

  async update(idUser: number, idRestaurant: number, updateReviewDto: UpdateReviewDto) {
    if (!Number.isInteger(idUser))
      throw new BadRequestException("Invalid user ID");
    if (!Number.isInteger(idRestaurant))
      throw new BadRequestException("Invalid restaurant ID");
    if (updateReviewDto.date !== undefined)
      updateReviewDto.date = new Date(updateReviewDto.date)
    const database = this.databaseService.getDatabase();
    let data: any;
    try {
      data = await database
        .update(reviews)
        .set({
          date: updateReviewDto.date,
          score: updateReviewDto.score,
          description: updateReviewDto.description
        })
        .where(
          and(
            eq(reviews.id_user, idUser),
            eq(reviews.id_restaurant, idRestaurant)
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
      message: "Successfully updated",
      data: data
    };
  }

  async remove(idUser: number, idRestaurant: number) {
    if (!Number.isInteger(idUser))
      throw new BadRequestException("Invalid user ID");
    if (!Number.isInteger(idRestaurant))
      throw new BadRequestException("Invalid restaurant ID");
    const database = this.databaseService.getDatabase();
    let data: any;
    try {
      data = await database
        .delete(reviews)
        .where(
          and(
            eq(reviews.id_user, idUser),
            eq(reviews.id_restaurant, idRestaurant)
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


  async sendNotificationUpdate(idRestaurant: number): Promise<void> {
    try {
        const restaurantNotificationDto: CreateNotificationDto = {
          title: "Nuova recensione",
          message: "Hai una nuova recensione da leggere.",
          id_receiver: idRestaurant,
          role: UserType.restaurant
        }
        this.notificationsService.create(restaurantNotificationDto);
      }
    catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Notification error");
    }
  }

  
}
