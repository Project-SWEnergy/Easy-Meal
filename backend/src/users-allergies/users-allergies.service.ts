import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUsersAllergyDto } from './dto/create-users-allergy.dto';
import { ResultUserAllergiesDto } from './dto/result-users-allergy.dto';
import { allergies, users_allergies } from '../../db/schema';
import { eq, and } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersAllergiesService {

  constructor(
    private databaseService: DatabaseService
  ) { }

  async create(createUsersAllergyDto: CreateUsersAllergyDto, userId: number): Promise<ResultUserAllergiesDto> {
    const database = this.databaseService.getDatabase();
    if (!Number.isInteger(userId))
      throw new BadRequestException("Invalid user ID");
    const createdUserAllergies: any[] = [];
    for (let i = 0; i < createUsersAllergyDto.allergyId.length; i++) {
      const usersAllergies = {
        id_user: userId,
        id_allergy: createUsersAllergyDto.allergyId[i]
      };
      let createdUserAllergy: any;
      try {
        createdUserAllergy = await database
          .insert(users_allergies)
          .values(usersAllergies)
          .returning();
      }
      catch (error) {
        console.error(error)
        throw new InternalServerErrorException(error.message)
      }
      createdUserAllergies.push(createdUserAllergy);
    }
    if (createdUserAllergies.length !== createUsersAllergyDto.allergyId.length)
      throw new InternalServerErrorException("Failed to create all user-allergies");
    return {
      result: true,
      message: "Successfully created: user-allergy",
      data: createdUserAllergies
    };
  }

  async findAllByUser(userId: number): Promise<ResultUserAllergiesDto> {
    if (!Number.isInteger(userId))
      throw new BadRequestException("Invalid data from token");
    const database = this.databaseService.getDatabase();
    let foundAllergies: any;
    try {
      foundAllergies = await database
        .select({
          userId: users_allergies.id_user,
          allergyId: users_allergies.id_allergy,
          allergyName: allergies.name,
        })
        .from(users_allergies)
        .leftJoin(allergies, eq(allergies.id, users_allergies.id_allergy))
        .where(eq(users_allergies.id_user, userId));
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: foundAllergies
    }
  }

  async findOneByUser(allergyId: number, userId: number): Promise<ResultUserAllergiesDto> {
    if (!Number.isInteger(userId))
      throw new BadRequestException("Invalid user ID");
    if (!Number.isInteger(allergyId))
      throw new BadRequestException("Invalid allergy ID");
    const database = this.databaseService.getDatabase();
    let foundAllergies: any;
    try {
      foundAllergies = await database
        .select({
          userId: users_allergies.id_user,
          allergyId: users_allergies.id_allergy,
          allergyName: allergies.name,
        })
        .from(users_allergies)
        .leftJoin(allergies, eq(allergies.id, users_allergies.id_allergy))
        .where(
          and(
            eq(users_allergies.id_user, userId),
            eq(users_allergies.id_allergy, allergyId)
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
      data: foundAllergies
    }
  }

  async update(userId: number, createUsersAllergyDto: CreateUsersAllergyDto): Promise<ResultUserAllergiesDto> {
    if (!Number.isInteger(userId))
      throw new BadRequestException("Invalid user ID");
    let createdUserAllergies: any[] = [];
    const database = this.databaseService.getDatabase();
    await database.transaction(async (transaction) => {
      let allergiesDeleted: any
      try {
        allergiesDeleted = await transaction
          .delete(users_allergies)
          .where(eq(users_allergies.id_user, userId))
          .returning();
      }
      catch (error) {
        console.log(error)
        transaction.rollback();
        throw new InternalServerErrorException(error.message);
      }
      for (let i = 0; i < createUsersAllergyDto.allergyId.length; i++) {
        const usersAllergies = {
          id_user: userId,
          id_allergy: createUsersAllergyDto.allergyId[i]
        };
        let createdUserAllergy: any;
        try {
          createdUserAllergy = await database
            .insert(users_allergies)
            .values(usersAllergies)
            .returning();
        }
        catch (error) {
          console.error(error)
          transaction.rollback();
          throw new InternalServerErrorException(error.message)
        }
        createdUserAllergies.push(createdUserAllergy);
      }
      if (createdUserAllergies.length !== createUsersAllergyDto.allergyId.length) {
        transaction.rollback();
        throw new InternalServerErrorException("Failed to create all user-allergies");
      };
    });
    return {
      result: true,
      message: "Update successful",
      data: createdUserAllergies
    }
  }
}
