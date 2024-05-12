import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOpeningHoursDto } from './dto/create-opening-hours.dto';
import { UpdateOpeningHoursDto } from './dto/update-opening-hours.dto';
import { Result } from 'drizzle-orm/sqlite-core';
import { ResultOpeningHoursDto } from './dto/result-opening-hours.dto';
import { DatabaseService } from '../database/database.service';
import { eq } from 'drizzle-orm';
import { days_of_week, opening_hours } from '../../db/schema';

@Injectable()
export class OpeningHoursService {

  constructor(
    private databaseService: DatabaseService
  ) { }

  async create(createOpeningHourDto: CreateOpeningHoursDto[]): Promise<ResultOpeningHoursDto> {
    for (let index = 0; index < createOpeningHourDto.length; index++){
      if (!Number.isInteger(createOpeningHourDto[index].id_restaurant))
        throw new BadRequestException("Invalid restaurant ID");
    }
    let data: any;
    let dataList: any[] = [];
    try {
      const database = this.databaseService.getDatabase();
      for (let index = 0; index < createOpeningHourDto.length; index++) {
        data = await database
          .insert(opening_hours)
          .values(createOpeningHourDto[index])
          .returning();
        dataList.push(data)
      }
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully created",
      data: dataList
    };
  }

  async findAllByRestaurantId(restaurantId: number): Promise<ResultOpeningHoursDto> {
    if (!Number.isInteger(restaurantId))
      throw new BadRequestException("Invalid restaurant ID");
    let data: any;
    try {
      const database = this.databaseService.getDatabase();
      data = await database
        .select({
          id: opening_hours.id,
          id_restaurant: opening_hours.id_restaurant,
          id_day: opening_hours.id_day,
          name_day: days_of_week.name,
          abbreviation_day: days_of_week.abbreviation,
          order_day: days_of_week.order,
          opening_time: opening_hours.opening_time,
          closing_time: opening_hours.closing_time
        })
        .from(opening_hours)
        .leftJoin(days_of_week, eq(days_of_week.id, opening_hours.id_day))
        .where(eq(opening_hours.id_restaurant, restaurantId));
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: data
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(id))
      throw new BadRequestException("Invalid ID"); 
    let data: any;
    try {
      const database = this.databaseService.getDatabase();
      data = await database
        .select({
          id: opening_hours.id,
          id_restaurant: opening_hours.id_restaurant,
          id_day: opening_hours.id_day,
          name_day: days_of_week.name,
          abbreviation_day: days_of_week.abbreviation,
          order_day: days_of_week.order,
          opening_time: opening_hours.opening_time,
          closing_time: opening_hours.closing_time
        })
        .from(opening_hours)
        .leftJoin(days_of_week, eq(days_of_week.id, opening_hours.id_day))
        .where(eq(opening_hours.id, id));
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: data
    };
  }

  async update(id: number, updateOpeningHourDto: UpdateOpeningHoursDto) {
    if (!Number.isInteger(id))
      throw new BadRequestException("Invalid ID");
    let data: any;
    try {
      const database = this.databaseService.getDatabase();
      data = await database
        .update(opening_hours)
        .set(updateOpeningHourDto)
        .where(eq(opening_hours.id, id))
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

  async remove(id: number) {
    if (!Number.isInteger(id))
      throw new BadRequestException("Invalid ID");
    let deletedIngredient: any;
    try {
      const database = this.databaseService.getDatabase();
      deletedIngredient = await database
        .delete(opening_hours)
        .where(eq(opening_hours.id, id))
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully deleted",
      data: deletedIngredient
    }
  }



}
