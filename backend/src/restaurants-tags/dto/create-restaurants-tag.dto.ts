import { IsArray, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param id_tags number[] : id dei tag
 */
export class CreateRestaurantsTagDto {
    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    id_tags: number[]
}
