import { ApiProperty } from "@nestjs/swagger";

/**
 * @param id_allergy number: id allergia
 * @param name_allergy string?: nome dell'allergia
 * @param id_ingredient number: id ingrediente
 * @param name_ingredient string?: nome dell'ingrediente
 */
export class AllergiesIngredient {
    @ApiProperty()
    id_allergy: number;
    @ApiProperty()
    name_allergy?: string;
    @ApiProperty()
    id_ingredient: number;
    @ApiProperty()
    name_ingredient?: string;
}
