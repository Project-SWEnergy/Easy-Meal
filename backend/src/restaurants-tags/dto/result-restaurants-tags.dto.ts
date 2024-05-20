
import { RestaurantsTag } from "../entities/restaurants-tag.entity";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param result bool : risultato dell' operazione
 * @param message string : messaggio di risposta
 * @param {RestaurantsTag} data RestaurantsTag[ ] : oggetto RestaurantsTag
 */

export class ResultRestaurantsTagsDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: RestaurantsTag[];
}


