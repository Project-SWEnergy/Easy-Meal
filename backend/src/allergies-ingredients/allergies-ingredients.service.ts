import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAllergiesIngredientDto } from './dto/create-allergies-ingredient.dto';
import { DatabaseService } from '../database/database.service';
import { and, eq } from 'drizzle-orm';
import { ResultAllergiesIngredientDto } from './dto/result-allergies-ingredient.dto';
import { allergies, allergies_ingredients, ingredients } from '../../db/schema';

@Injectable()
export class AllergiesIngredientsService {

  constructor(
    private databaseService: DatabaseService
  ) { }

  async create(createAllergiesIngredientDto: CreateAllergiesIngredientDto): Promise<ResultAllergiesIngredientDto> {
    let createAllergiesIngredient: any;
    try {
      const database = this.databaseService.getDatabase();
      createAllergiesIngredient = await database
        .insert(allergies_ingredients)
        .values(createAllergiesIngredientDto)
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully created",
      data: createAllergiesIngredient
    }
  }


  async findAllByAllergyId(idAllergy: number): Promise<ResultAllergiesIngredientDto> {
    if (!Number.isInteger(idAllergy))
      throw new BadRequestException("Invalid allergy ID");
    let foundAllergiesIngredient: any;
    try {
      const database = this.databaseService.getDatabase();
      foundAllergiesIngredient = await database
        .select({
          idAllergy: allergies_ingredients.id_allergy,
          nameAllergy: allergies.name,
          idIngredient: allergies_ingredients.id_ingredient,
          nameIngredient: ingredients.name
        })
        .from(allergies_ingredients)
        .leftJoin(allergies, eq(allergies.id, allergies_ingredients.id_allergy))
        .leftJoin(ingredients, eq(ingredients.id, allergies_ingredients.id_ingredient))
        .where(eq(allergies_ingredients.id_allergy, idAllergy));
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: foundAllergiesIngredient
    }
  }

  async findAllByIngredientId(idIngredient: number): Promise<ResultAllergiesIngredientDto> {
    if (!Number.isInteger(idIngredient))
      throw new BadRequestException("Invalid ingredient ID");
    let foundAllergiesIngredient: any;
    try {
      const database = this.databaseService.getDatabase();

      foundAllergiesIngredient = await database
        .select({
          idAllergy: allergies_ingredients.id_allergy,
          nameAllergy: allergies.name,
          idIngredient: allergies_ingredients.id_ingredient,
          nameIngredient: ingredients.name
        })
        .from(allergies_ingredients)
        .leftJoin(allergies, eq(allergies.id, allergies_ingredients.id_allergy))
        .leftJoin(ingredients, eq(ingredients.id, allergies_ingredients.id_ingredient))
        .where(eq(allergies_ingredients.id_ingredient, idIngredient));
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: foundAllergiesIngredient
    }
  }

  async findOne(idAllergy: number, idIngredient: number): Promise<ResultAllergiesIngredientDto> {
    if (!Number.isInteger(idIngredient))
      throw new BadRequestException("Invalid ingredient ID");
    if (!Number.isInteger(idAllergy))
      throw new BadRequestException("Invalid allergy ID");
    let foundAllergiesIngredient: any;
    try {
      const database = this.databaseService.getDatabase();

      foundAllergiesIngredient = await database
        .select({
          idAllergy: allergies_ingredients.id_allergy,
          nameAllergy: allergies.name,
          idIngredient: allergies_ingredients.id_ingredient,
          nameIngredient: ingredients.name
        })
        .from(allergies_ingredients)
        .leftJoin(allergies, eq(allergies.id, allergies_ingredients.id_allergy))
        .leftJoin(ingredients, eq(ingredients.id, allergies_ingredients.id_ingredient))
        .where(
          and(
            eq(allergies_ingredients.id_ingredient, idIngredient),
            eq(allergies_ingredients.id_allergy, idAllergy)
          )
        );
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: foundAllergiesIngredient
    }
  }


  async remove(idAllergy: number, idIngredient: number) {
    if (!Number.isInteger(idIngredient))
      throw new BadRequestException("Invalid ingredient ID");
    if (!Number.isInteger(idAllergy))
      throw new BadRequestException("Invalid allergy ID");
    let deletedAllergiesIngredient: any;
    try {
      const database = this.databaseService.getDatabase();

      deletedAllergiesIngredient = await database
        .delete(allergies_ingredients)
        .where(
          and(
            eq(allergies_ingredients.id_ingredient, idIngredient),
            eq(allergies_ingredients.id_allergy, idAllergy)
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
      message: "Delete successful",
      data: deletedAllergiesIngredient
    }
  }
}
