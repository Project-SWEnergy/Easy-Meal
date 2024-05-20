import { IsNotEmpty, IsOptional } from 'class-validator';
import { UpdateRestaurantDto } from './update-restaurant.dto';
import { UpdateAddressDto } from '../../addresses/dto/update-address.dto';
import { ApiProperty } from "@nestjs/swagger";
export class UpdateRestaurantAddressDto {
    @IsNotEmpty()
    @ApiProperty()
    updateRestaurantDto: UpdateRestaurantDto;

    @IsOptional()
    @ApiProperty()
    updateAddressDto: UpdateAddressDto;
}