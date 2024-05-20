import { ApiProperty } from "@nestjs/swagger";
/**
 * @param id_tag number : id dei tag
 * @param name_tag string: nome del tag
 * @param description_tag string: descrizione del tag
 * @param id_restaurant number : id del ristorante
 */
export class RestaurantsTag {
    @ApiProperty()
    id_tag: number;
    @ApiProperty()
    name_tag: string;
    @ApiProperty()
    description_tag: string;
    @ApiProperty()
    id_restaurant: number;
}
