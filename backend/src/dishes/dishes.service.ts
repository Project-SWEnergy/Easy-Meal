import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { ResultDishesDto } from './dto/result-dish.dto';
import { DatabaseService } from '../database/database.service';
import { dishes } from '../../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class DishesService {

  constructor(
    private databaseService: DatabaseService
  ) { }

  async create(createDishDto: CreateDishDto): Promise<ResultDishesDto> {
    let createdDish: any;
    try {
      const database = this.databaseService.getDatabase();
      createdDish = await database
        .insert(dishes)
        .values(createDishDto)
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully created: dish",
      data: createdDish
    }
  }

  async findAllByRestaurantId(idRestaurant: number): Promise<ResultDishesDto> {
    if (!Number.isInteger(idRestaurant))
      throw new BadRequestException("Invalid restaurant ID");
    let foundDishes: any;
    try {
      const database = this.databaseService.getDatabase();
      foundDishes = await database
        .select()
        .from(dishes)
        .where(eq(dishes.id_restaurant, idRestaurant));
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful: dish",
      data: foundDishes
    }
  }

  async findOne(dishId: number): Promise<ResultDishesDto> {
    if (!Number.isInteger(dishId))
      throw new BadRequestException("Invalid restaurant");
  
    let foundDishes: any;
    try {
      const database = this.databaseService.getDatabase();
      foundDishes = await database
        .select()
        .from(dishes)
        .where(eq(dishes.id, dishId));
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful: dish",
      data: foundDishes
    }
  }


  async update(dishId: number, updateDishDto: UpdateDishDto): Promise<ResultDishesDto> {
    if (!Number.isInteger(dishId))
      throw new BadRequestException("Invalid dish ID");
    let modifiedDish: any;
    try {
      const database = this.databaseService.getDatabase();
      modifiedDish = await database
        .update(dishes)
        .set({
          name: updateDishDto.name,
          description: updateDishDto.description,
          price: updateDishDto.price,
          image: updateDishDto.image
        })
        .where(eq(dishes.id, dishId))
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Update successful: dish",
      data: modifiedDish
    }
  }

  async remove(dishId: number): Promise<ResultDishesDto> {
    if (!Number.isInteger(dishId))
      throw new BadRequestException("Invalid data");
    let deletedDish: any;
    try {
      const database = this.databaseService.getDatabase();
      deletedDish = await database
        .delete(dishes)
        .where(eq(dishes.id, dishId))
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully deleted: dish",
      data: deletedDish
    }
  }
}
