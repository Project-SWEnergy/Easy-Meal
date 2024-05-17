import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';
import { allergies } from '../../db/schema';
import { ResultAllergyDto } from './dto/result-allergy.dto';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';


@Injectable()
export class AllergiesService {

  constructor(
    private databaseService: DatabaseService
  ) { }

  async create(createAllergyDto: CreateAllergyDto): Promise<ResultAllergyDto> {
    let createdAllergy: any;
    try {
      const database = this.databaseService.getDatabase();
      createdAllergy = await database
        .insert(allergies)
        .values(createAllergyDto)
        .returning();
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully created",
      data: createdAllergy
    }
  }

  async findAll(): Promise<ResultAllergyDto> {
    let foundAllergies: any;
    try {
      const database = this.databaseService.getDatabase();
      foundAllergies = await database
        .select()
        .from(allergies);
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

  async findOne(id: number): Promise<ResultAllergyDto> {
    if (!Number.isInteger(id))
      throw new BadRequestException("Invalid ID");
    let foundAllergy: any;
    try {
      const database = this.databaseService.getDatabase();
      foundAllergy = await database
        .select()
        .from(allergies)
        .where(eq(allergies.id, id));
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: foundAllergy
    }
  }

  async update(id: number, updateAllergyDto: UpdateAllergyDto): Promise<ResultAllergyDto> {
    if (!Number.isInteger(id))
      throw new BadRequestException("Invalid ID");
    let modifiedAllergy: any;
    try {
      const database = this.databaseService.getDatabase();
      modifiedAllergy = await database
        .update(allergies)
        .set({ name: updateAllergyDto.name, icon: updateAllergyDto.icon })
        .where(eq(allergies.id, id))
        .returning();
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully updated: allergy",
      data: modifiedAllergy
    }
  }

  async remove(id: number): Promise<ResultAllergyDto> {
    if (!Number.isInteger(id))
      throw new BadRequestException("Invalid ID");
    let deletedAllergy: any;
    try {
      const database = this.databaseService.getDatabase();
      deletedAllergy = await database
        .delete(allergies)
        .where(eq(allergies.id, id))
        .returning();
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully deleted: allergy",
      data: deletedAllergy
    }
  }

}
