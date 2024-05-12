import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { DatabaseService } from 'src/database/database.service';
import { ResultRestaurantDto } from './dto/result-restaurant.dto';
import * as argon from 'argon2';
import { addresses, restaurants } from '../../db/schema';
import { eq } from 'drizzle-orm';


@Injectable()
export class RestaurantsService {

  constructor(
    private databaseService: DatabaseService
  ) { }

  async create(createRestaurantDto: CreateRestaurantDto): Promise<ResultRestaurantDto> {
    const database = this.databaseService.getDatabase();
    const password = createRestaurantDto.password;
    const passwordHash = await argon.hash(createRestaurantDto.password);
    createRestaurantDto.password = passwordHash;
    let createdRestaurant: any; 
    try {
      createdRestaurant = await database
        .insert(restaurants)
        .values(createRestaurantDto)
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    createdRestaurant[0].password = password
    return {
      result: true,
      message: "Successfully created: restaurant",
      data: createdRestaurant
    }
  }

  async findAll() : Promise<ResultRestaurantDto> {
    const database = this.databaseService.getDatabase();
    let restaurantsData: any;
    try {
      restaurantsData = await database
        .select({
          id: restaurants.id,
          email: restaurants.email,
          name: restaurants.name,
          owner_name: restaurants.owner_name,
          owner_surname: restaurants.owner_surname,
          id_address: restaurants.id_address,
          address_city: addresses.city,
          address_street: addresses.street,
          address_street_number: addresses.street_number,
          address_state: addresses.state,
          address_zip_code: addresses.zip_code,
          seats: restaurants.seats,
          website: restaurants.website,
          price_tier: restaurants.price_tier,
          description: restaurants.description,
          phone: restaurants.phone,
          children_seats: restaurants.childrenn_seats,
          accessibility: restaurants.accessibility,
          logo: restaurants.logo,
          banner_image: restaurants.banner_image
        })
        .from(restaurants)
        .leftJoin(addresses, eq(restaurants.id_address, addresses.id));
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: restaurantsData
    };
  }

  async findAllByCity(cityName: string) : Promise<ResultRestaurantDto> {
    const database = this.databaseService.getDatabase();
    let restaurantsData: any;
    try {
      restaurantsData = await database
        .select({
          id: restaurants.id,
          email: restaurants.email,
          name: restaurants.name,
          owner_name: restaurants.owner_name,
          owner_surname: restaurants.owner_surname,
          id_address: restaurants.id_address,
          address_city: addresses.city,
          address_street: addresses.street,
          address_street_number: addresses.street_number,
          address_state: addresses.state,
          address_zip_code: addresses.zip_code,
          seats: restaurants.seats,
          website: restaurants.website,
          price_tier: restaurants.price_tier,
          description: restaurants.description,
          phone: restaurants.phone,
          children_seats: restaurants.childrenn_seats,
          accessibility: restaurants.accessibility,
          logo: restaurants.logo,
          banner_image: restaurants.banner_image
        })
        .from(restaurants)
        .leftJoin(addresses, eq(restaurants.id_address, addresses.id))
        .where(eq(addresses.city, cityName));
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: restaurantsData
    };
  }

  async findOne(id: number): Promise<ResultRestaurantDto> {
    if (!Number.isInteger(id))
      throw new BadRequestException("Invalid restaurant ID");
    const database = this.databaseService.getDatabase();
    let restaurantsData: any;
    try {
      restaurantsData = await database
        .select({
          id: restaurants.id,
          email: restaurants.email,
          name: restaurants.name,
          owner_name: restaurants.owner_name,
          owner_surname: restaurants.owner_surname,
          id_address: restaurants.id_address,
          address_city: addresses.city,
          address_street: addresses.street,
          address_street_number: addresses.street_number,
          address_state: addresses.state,
          address_zip_code: addresses.zip_code,
          seats: restaurants.seats,
          website: restaurants.website,
          price_tier: restaurants.price_tier,
          description: restaurants.description,
          phone: restaurants.phone,
          children_seats: restaurants.childrenn_seats,
          accessibility: restaurants.accessibility,
          logo: restaurants.logo,
          banner_image: restaurants.banner_image
        })
        .from(restaurants)
        .leftJoin(addresses, eq(restaurants.id_address, addresses.id))
        .where(eq(restaurants.id, id));
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successful",
      data: restaurantsData
    };
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    if (!Number.isInteger(id))
      throw new BadRequestException("Invalid restaurant ID");
    const database = this.databaseService.getDatabase();
    let data: any;
    try {
      data = await database
        .update(restaurants)
        .set(updateRestaurantDto)
        .where(eq(restaurants.id, id))
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Update successful",
      data: data
    }
  }

  async remove(id: number) {
    if (!Number.isInteger(id))
      throw new BadRequestException("Invalid restaurant ID");
    const database = this.databaseService.getDatabase();
    let data: any;
    try {
      data = await database
        .delete(restaurants)
        .where(eq(restaurants.id, id))
        .returning();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully deleted",
      data: data
    }
  }
}
