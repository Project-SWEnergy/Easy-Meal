import { IsNotEmpty } from "class-validator";
import { CreateRestaurantDto } from "./create-restaurant.dto";
import { CreateAddressDto } from "src/addresses/dto/create-address.dto";
/**
 * @param createRestaurantDto CreateRestaurantDto
 * @param createAddressDto CreateAddressDto
 */
export class CreateRestaurantAddressDto {    
    @IsNotEmpty()
    createRestaurantDto: CreateRestaurantDto;

    @IsNotEmpty()
    createAddressDto: CreateAddressDto;
}
