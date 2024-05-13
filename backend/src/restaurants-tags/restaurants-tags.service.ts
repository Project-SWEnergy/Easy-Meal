import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRestaurantsTagDto } from './dto/create-restaurants-tag.dto';
import { UpdateRestaurantsTagDto } from './dto/update-restaurants-tag.dto';
import { DatabaseService } from '../database/database.service';
import { restaurants_tags } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { ResultRestaurantsTagsDto } from './dto/result-restaurants-tags.dto';

@Injectable()


export class RestaurantsTagsService {

  constructor(private databaseService: DatabaseService) { }

  async create(createRestaurantsTagDto: CreateRestaurantsTagDto, restaurantId: number): Promise<ResultRestaurantsTagsDto> {
    if (!Number.isInteger(restaurantId))
      throw new BadRequestException("Invalid restaurant ID");
    const database = this.databaseService.getDatabase();
    let data: any;
    let dataList: any[]= [];
    for (let index = 0; index < createRestaurantsTagDto.id_tags.length; index++) {
      if (!Number.isInteger(createRestaurantsTagDto.id_tags[index]))
        throw new BadRequestException("Invalid tag ID");
      try {
        data = await database
          .insert(restaurants_tags)
          .values({
            id_tag: createRestaurantsTagDto.id_tags[index],
            id_restaurant: restaurantId
          })
          .returning();
        dataList.push(data);
      }
      catch (error) {
        console.log(error)
        throw new InternalServerErrorException(error.message)
      }
    }
    return {
      result: true,
      message: "Successfully created",
      data: dataList
    }

  }

  async findAllByRestaurantId(restaurantId: number): Promise<ResultRestaurantsTagsDto> { 
    const database = this.databaseService.getDatabase();
    if (!Number.isInteger(restaurantId))
      throw new BadRequestException("Invalid restaurant ID");
    let foundTags: any;
    try {
      foundTags = await database
        .select({
          id_tag: restaurants_tags.id_tag,
          id_restaurant: restaurants_tags.id_restaurant
        })
        .from (restaurants_tags)
        .where(eq(restaurants_tags.id_restaurant, restaurantId));
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: foundTags
    }   
  }


  async update(restaurantId: number, updateRestaurantsTagDto: UpdateRestaurantsTagDto): Promise<ResultRestaurantsTagsDto> {
    if (updateRestaurantsTagDto.id_tags === undefined)
      throw new BadRequestException("Nothing to update");
    if (!Number.isInteger(restaurantId))
      throw new BadRequestException("Invalid restaurant ID");
    await this.removeAll(restaurantId);
    const database = this.databaseService.getDatabase();
    let data: any;
    let dataList: any[]= [];
    for (let index = 0; index < updateRestaurantsTagDto.id_tags.length; index++) {
      if (!Number.isInteger(updateRestaurantsTagDto.id_tags[index]))
        throw new BadRequestException("Invalid tag ID");
      try {
        data = await database
          .insert(restaurants_tags)
          .values({
            id_tag: updateRestaurantsTagDto.id_tags[index],
            id_restaurant: restaurantId
          })
          .returning();
        dataList.push(data);
      }
      catch (error) {
        console.log(error)
        throw new InternalServerErrorException(error.message)
      }
    }
    return {
      result: true,
      message: "Successfully updated",
      data: dataList
    }

    
  }

  async removeAll(restaurantId: number) {
    const database = this.databaseService.getDatabase();
    if (!Number.isInteger(restaurantId))
      throw new BadRequestException("Invalid restaurant ID");
    let data: any;
    try {
      data = await database
        .delete(restaurants_tags)
        .where(eq(restaurants_tags.id_restaurant, restaurantId))
        .returning();
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Delete successful",
      data: data
    }   
  }

  
}
