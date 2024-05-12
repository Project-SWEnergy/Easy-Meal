import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDaysOfTheWeekDto } from './dto/create-days-of-the-week.dto';
import { UpdateDaysOfTheWeekDto } from './dto/update-days-of-the-week.dto';
import { DatabaseService } from '../database/database.service';
import { eq } from 'drizzle-orm';
import { days_of_week } from '../../db/schema';

@Injectable()
export class DaysOfTheWeekService {

  constructor(
    private databaseService: DatabaseService
  ) { }
  /*create(createDaysOfTheWeekDto: CreateDaysOfTheWeekDto) {
    return 'This action adds a new daysOfTheWeek';
  }

  findAll() {
    return `This action returns all daysOfTheWeek`;
  }

  findOne(id: number) {
    return `This action returns a #${id} daysOfTheWeek`;
  }

  update(id: number, updateDaysOfTheWeekDto: UpdateDaysOfTheWeekDto) {
    return `This action updates a #${id} daysOfTheWeek`;
  }

  remove(id: number) {
    return `This action removes a #${id} daysOfTheWeek`;
  }*/

  async getNameFromId(idDay: number) {
    if (!Number.isInteger(idDay))
      throw new BadRequestException("Invalid day ID");
    let foundDay: any;
    try {
      const database = this.databaseService.getDatabase();

      foundDay = await database
        .select()
        .from(days_of_week)
        .where(eq(days_of_week.id, idDay));
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: foundDay
    }
  }

  async findAll() {
    let foundDay: any;
    try {
      const database = this.databaseService.getDatabase();

      foundDay = await database
        .select()
        .from(days_of_week)
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: foundDay
    }
  }

}
