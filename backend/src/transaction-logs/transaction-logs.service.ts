import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTransactionLogDto } from './dto/create-transaction-log.dto';
import { UpdateTransactionLogDto } from './dto/update-transaction-log.dto';
import { DatabaseService } from '../database/database.service';
import { transactions_logs } from '../../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class TransactionLogsService {

  constructor(
    private databaseService: DatabaseService
  ) { }
  
  async create(createTransactionLogDto: CreateTransactionLogDto) {
    if (!Number.isInteger(createTransactionLogDto.id_bill))
      throw new BadRequestException("Invalid bill ID");
    createTransactionLogDto.timestamp = new Date(createTransactionLogDto.timestamp);
    const database = this.databaseService.getDatabase();
    let data: any;
    try {
      data = await database
        .insert(transactions_logs)
        .values(createTransactionLogDto)
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


  async findAllByBillId(id: number) {
    if (!Number.isInteger(id))
      throw new BadRequestException("Invalid bill ID");
    const database = this.databaseService.getDatabase();
    let data: any;
    try {
      data = await database
        .select()
        .from(transactions_logs)
        .where(eq(transactions_logs.id_bill, id));
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


  async remove(id: number) {
    if (!Number.isInteger(id))
      throw new BadRequestException("Invalid ID");
    const database = this.databaseService.getDatabase();
    let data: any;
    try {
      data = await database
        .delete(transactions_logs)
        .where(eq(transactions_logs.id, id))
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    if (data.length == 0)
      throw new BadRequestException("Missing transaction ID")
    return {
      result: true,
      message: "Successfully deleted",
      data: data
    }
  }
}
