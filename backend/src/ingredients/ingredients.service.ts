import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { DatabaseService } from '../database/database.service';
import { ingredients } from '../../db/schema';
import { ResultIngredientDto } from './dto/result-ingredients.dto';
import { eq } from 'drizzle-orm';
import { UnitsOfMeasurement } from './entities/ingredient.entity';

@Injectable()
export class IngredientsService {

  constructor(
    private databaseService: DatabaseService
  ) { }

  isValidUnitsOfMeasurement(value: string): boolean {
    return Object.values(UnitsOfMeasurement).includes(value as UnitsOfMeasurement);
  }
  
  async create(createIngredientDto: CreateIngredientDto): Promise<ResultIngredientDto> {
    if (createIngredientDto.unit_of_measurement !== undefined
      && !this.isValidUnitsOfMeasurement(createIngredientDto.unit_of_measurement))
      throw new BadRequestException("Invalid units of measurement");
    if (!Number.isInteger(createIngredientDto.id_restaurant))
      throw new BadRequestException("Invalid restaurant ID");
    let createdIngredient: any;
    try {
      const database = this.databaseService.getDatabase();
      createdIngredient = await database
        .insert(ingredients)
        .values(createIngredientDto)
        .returning();
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully created",
      data: createdIngredient
    };
  }

  async findAllByRestaurantId(restaurantId: number): Promise<ResultIngredientDto> {
    if (!Number.isInteger(restaurantId))
      throw new BadRequestException("Invalid restaurant ID");
    let foundIngredients: any;
    try {
      const database = this.databaseService.getDatabase();
      foundIngredients = await database
        .select({
          id: ingredients.id,
          name: ingredients.name,
		  unit_of_measurement: ingredients.unit_of_measurement
        })
        .from(ingredients)
        .where(eq(ingredients.id_restaurant, restaurantId));
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: foundIngredients
    };
  }

  async findOneByIngredientId(ingredientId: number): Promise<ResultIngredientDto>  {
    if (!Number.isInteger(ingredientId))
      throw new BadRequestException("Invalid ingredient ID");
    let foundIngredients: any;
    try {
      const database = this.databaseService.getDatabase();
      foundIngredients = await database
        .select()
        .from(ingredients)
        .where(eq(ingredients.id, ingredientId));
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: foundIngredients
    };
  }

  async update(ingredientId: number, updateIngredientDto: UpdateIngredientDto): Promise<ResultIngredientDto> {
    if (!Number.isInteger(ingredientId))
      throw new BadRequestException("Invalid ingredient ID");
    let modifiedIngredient: any;
    try {
      const database = this.databaseService.getDatabase();
      modifiedIngredient = await database
        .update(ingredients)
        .set({
          name: updateIngredientDto.name,
          unit_of_measurement: updateIngredientDto.unit_of_measurement
        })
        .where(eq(ingredients.id, ingredientId))
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully updated",
      data: modifiedIngredient
    };
  }

  async remove(ingredientId: number): Promise<ResultIngredientDto> {
    if (!Number.isInteger(ingredientId))
      throw new BadRequestException("Invalid ingredient ID");
    let deletedIngredient: any;
    try {
      const database = this.databaseService.getDatabase();
      deletedIngredient = await database
        .delete(ingredients)
        .where(eq(ingredients.id, ingredientId))
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
