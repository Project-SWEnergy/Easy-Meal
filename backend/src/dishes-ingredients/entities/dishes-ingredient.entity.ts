import { UnitsOfMeasurement } from "src/ingredients/entities/ingredient.entity";


/**
 * @param id_dish number: id piatto
 * @param id_ingredient number: id ingrediente
 * @param quantity number?: quantità di ingrediente necessaria
 * @param units_of_measurement UnitsOfMeasurement?: unità di misura
 */
export class DishesIngredient {
    id_dish: number;
    id_ingredient: number;
    quantity?: number;
    units_of_measurement?: UnitsOfMeasurement
}
