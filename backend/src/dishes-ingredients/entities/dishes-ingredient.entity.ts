import { UnitsOfMeasurement } from "src/ingredients/entities/ingredient.entity";
import { ApiProperty } from "@nestjs/swagger";

/**
 * @param id_dish number: id piatto
 * @param id_ingredient number: id ingrediente
 * @param quantity number?: quantità di ingrediente necessaria
 * @param units_of_measurement UnitsOfMeasurement?: unità di misura
 */
export class DishesIngredient {
    @ApiProperty()
    id_dish: number;
    @ApiProperty()
    id_ingredient: number;
    @ApiProperty()
    quantity?: number;
    @ApiProperty()
    units_of_measurement?: UnitsOfMeasurement
}
