import { IsArray, IsNotEmpty } from "class-validator";

/**
 * @param id_tags number[] : id dei tag
 */
export class CreateRestaurantsTagDto {
    @IsArray()
    @IsNotEmpty()
    id_tags: number[]
}
