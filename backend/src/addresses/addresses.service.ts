import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { DatabaseService } from '../database/database.service';
import { ResultAddressDto } from './dto/result-address.dto';
import { addresses, restaurants } from '../../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AddressesService {

  constructor(
    private databaseService: DatabaseService
  ) { }

  async create(createAddressDto: CreateAddressDto): Promise<ResultAddressDto> {
    let createdAddress: any;
    try {
      const database = this.databaseService.getDatabase();
      createdAddress = await database
        .insert(addresses)
        .values(createAddressDto)
        .returning();
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully created",
      data: createdAddress
    }
  }

  async findOne(addressId: number): Promise<ResultAddressDto> {
    if (!Number.isInteger(addressId))
      throw new BadRequestException("Invalid address ID");
    let foundAddress: any;
    try {
      const database = this.databaseService.getDatabase();
      foundAddress = await database
        .select({
          id: addresses.id,
          city: addresses.city,
          street: addresses.street,
          street_number: addresses.street_number,
          state: addresses.state,
          zip_code: addresses.zip_code
        })
        .from(addresses)
        .where(eq(addresses.id, addressId));
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successfull",
      data: foundAddress
    }
  }

  async update(UpdateAddressDto: UpdateAddressDto, addressId: number): Promise<ResultAddressDto> {
    if (!Number.isInteger(addressId))
      throw new BadRequestException("Invalid address ID");
    let modifiedAddress: any;
    try {
      const database = this.databaseService.getDatabase();
      modifiedAddress = await database
        .update(addresses)
        .set({
          city: UpdateAddressDto.city,
          street: UpdateAddressDto.street,
          street_number: UpdateAddressDto.street_number,
          state: UpdateAddressDto.state,
          zip_code: UpdateAddressDto.zip_code
        })
        .where(eq(addresses.id, addressId))
        .returning({
          id: addresses.id,
          city: addresses.city,
          street: addresses.street,
          street_number: addresses.street_number,
          state: addresses.state,
          zip_code: addresses.zip_code
        });
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully updated: address",
      data: modifiedAddress
    }
  }


  async remove(addressId: number): Promise<ResultAddressDto> {
    if (!Number.isInteger(addressId))
      throw new BadRequestException("Invalid address ID");
    let deletedAddress: any;
    try {
      const database = this.databaseService.getDatabase();
      deletedAddress = await database
        .delete(addresses)
        .where(eq(addresses.id, addressId))
        .returning({
          id: addresses.id,
          city: addresses.city,
          street: addresses.street,
          street_number: addresses.street_number,
          state: addresses.state,
          zip_code: addresses.zip_code
        });
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully deleted: address",
      data: deletedAddress
    }
  }

  async findByRestaurantId(restaurantId: number): Promise<ResultAddressDto> {
    try {
      const database = await this.databaseService.getDatabase();
      const idAddress = await database
        .select({ id: restaurants.id_address })
        .from(restaurants)
        .where(eq(restaurants.id, restaurantId));

      if (idAddress.length <= 0)
        throw new Error("Restaurant not found");
      else {
        const foundAddress = await database
          .select({
            id: addresses.id,
            city: addresses.city,
            street: addresses.street,
            street_number: addresses.street_number,
            state: addresses.state,
            zip_code: addresses.zip_code
          })
          .from(addresses)
          .where(eq(addresses.id, idAddress[0].id));
        return {
          result: true,
          message: "Research successfull",
          data: foundAddress
        }
      }
    }
    catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }
}
