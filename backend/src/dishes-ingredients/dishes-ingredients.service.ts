import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDishesIngredientDto } from './dto/create-dishes-ingredient.dto';
import { UpdateDishesIngredientDto } from './dto/update-dishes-ingredient.dto';
import { DatabaseService } from '../database/database.service';
import { dishes_ingredients } from '../../db/schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class DishesIngredientsService {

  constructor(
    private databaseService: DatabaseService
  ) { }


  async create(createDishesIngredientDto: CreateDishesIngredientDto[]) {
    let data: any;
    let dataList: any[] = [];
    try {
      const database = this.databaseService.getDatabase();

      for (let index = 0; index < createDishesIngredientDto.length; index++) {
        data = await database
        .insert(dishes_ingredients)
        .values({
          id_dish: createDishesIngredientDto[index].id_dish,
          id_ingredient: createDishesIngredientDto[index].id_ingredient,
          quantity: createDishesIngredientDto[index].quantity,
        })
          .returning();
        dataList.push(data);
      }
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully created",
      data: dataList
    }
  }

  async findAllByIngredientId(ingredientId: number) {
    if (!Number.isInteger(ingredientId))
      throw new BadRequestException("Invalid ingredient ID");
    let foundDishIngredient: any;
    try {
      const database = this.databaseService.getDatabase();
      foundDishIngredient = await database
        .select()
        .from(dishes_ingredients)
        .where(eq(dishes_ingredients.id_ingredient, ingredientId));
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: foundDishIngredient
    }
  }

  async findAllByDishId(dishId: number) {
    if (!Number.isInteger(dishId))
      throw new BadRequestException("Invalid dish ID");
    let foundDishIngredient: any;
    try {
      const database = this.databaseService.getDatabase();
      foundDishIngredient = await database
        .select()
        .from(dishes_ingredients)
        .where(eq(dishes_ingredients.id_dish, dishId));
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: foundDishIngredient
    }
  }

  async findOne(dishId: number, ingredientId: number) {
    if (!Number.isInteger(dishId))
      throw new BadRequestException("Invalid dish ID");
    if (!Number.isInteger(ingredientId))
      throw new BadRequestException("Invalid ingredient ID");
    let foundDishIngredient: any;
    try {
      const database = this.databaseService.getDatabase();
      foundDishIngredient = await database
        .select()
        .from(dishes_ingredients)
        .where(and(
          eq(dishes_ingredients.id_dish, dishId),
          eq(dishes_ingredients.id_ingredient, ingredientId)
        ));
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: foundDishIngredient
    }
  }


  async update(dishId: number, ingredientId: number, updateDishesIngredientDto: UpdateDishesIngredientDto) {
    if (!Number.isInteger(dishId))
      throw new BadRequestException("Invalid dish ID");
    if (!Number.isInteger(ingredientId))
      throw new BadRequestException("Invalid ingredient ID");
    let modifiedDishIngredient: any;
    try {
      const database = this.databaseService.getDatabase();
      modifiedDishIngredient = await database
        .update(dishes_ingredients)
        .set({
          quantity: updateDishesIngredientDto.quantity,
        })
        .where(and(
          eq(dishes_ingredients.id_dish, dishId),
          eq(dishes_ingredients.id_ingredient, ingredientId)
        ))
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Update successful",
      data: modifiedDishIngredient
    }
  }

  async remove(dishId: number, ingredientId: number) {
    if (!Number.isInteger(dishId))
      throw new BadRequestException("Invalid dish ID");
    if (!Number.isInteger(ingredientId))
      throw new BadRequestException("Invalid ingredient ID");
    let deletedDishIngredient: any;
    try {
      const database = this.databaseService.getDatabase();
      deletedDishIngredient = await database
        .delete(dishes_ingredients)
        .where(and(
          eq(dishes_ingredients.id_dish, dishId),
          eq(dishes_ingredients.id_ingredient, ingredientId)
        ))
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Delete successful",
      data: deletedDishIngredient
    }
  }
}
