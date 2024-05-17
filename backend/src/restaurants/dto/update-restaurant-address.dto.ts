import { IsNotEmpty, IsOptional } from 'class-validator';
import { UpdateRestaurantDto } from './update-restaurant.dto';
import { UpdateAddressDto } from '../../addresses/dto/update-address.dto';

export class UpdateRestaurantAddressDto {
    @IsNotEmpty()
    updateRestaurantDto: UpdateRestaurantDto;

    @IsOptional()
    updateAddressDto: UpdateAddressDto;
}