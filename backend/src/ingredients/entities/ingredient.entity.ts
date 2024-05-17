/**
 * @param id number: id ingrediente
 * @param id_restaurant number: id ristorante
 * @param name string: nome ingrediente
 * @param unit_of_measurement string: unità di misura
 */
export class Ingredient {
    id: number;
    id_restaurant: number;
    name: string;
    unit_of_measurement: string;
}

export enum UnitsOfMeasurement {
    g = 'g',
    ml = 'ml',
    pz = 'pz',
    qb = 'q.b.'
}