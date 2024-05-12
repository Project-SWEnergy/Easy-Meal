import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { notifications } from '../../db/schema';
import { eq, and } from 'drizzle-orm';
import { CreateNotificationDto } from './dto/create-notification.dto';


@Injectable()
export class NotificationsService {

  constructor(
    private databaseService: DatabaseService
  ) { }

  async create(createNotificationDto: CreateNotificationDto) {
    let data: any;
    try {
      const database = this.databaseService.getDatabase();

      data = await database
        .insert(notifications)
        .values(createNotificationDto)
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

  async findAllByUserIdAndRole(idUser: number, role: string) {
    if (!Number.isInteger(idUser))
      throw new BadRequestException("Invalid ID");
    let data: any;
    try {
      const database = this.databaseService.getDatabase();

      data = await database
        .select()
        .from(notifications)
        .where(
          and(
            eq(notifications.id_receiver, idUser),
            eq(notifications.role, role)
          )
        );
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

  async update(idNotification: number) {
    if (!Number.isInteger(idNotification))
      throw new BadRequestException("Invalid ID");
    let data: any;
    try {
      const database = this.databaseService.getDatabase();

      data = await database
        .update(notifications)
        .set({
          visualized: true,
        })
        .where(eq(notifications.id, idNotification))
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

}
