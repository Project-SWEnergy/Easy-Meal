import { IsNotEmpty } from "class-validator";
import { CreateRestaurantDto } from "./create-restaurant.dto";
import { CreateAddressDto } from "../../addresses/dto/create-address.dto";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param createRestaurantDto CreateRestaurantDto
 * @param createAddressDto CreateAddressDto
 */
export class CreateRestaurantAddressDto {    
    @IsNotEmpty()
    @ApiProperty()
    createRestaurantDto: CreateRestaurantDto;

    @IsNotEmpty()
    @ApiProperty()
    createAddressDto: CreateAddressDto;
}
