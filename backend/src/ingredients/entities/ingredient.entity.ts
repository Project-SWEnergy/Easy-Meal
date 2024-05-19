import { ApiProperty } from "@nestjs/swagger";
/**
 * @param id number: id ingrediente
 * @param id_restaurant number: id ristorante
 * @param name string: nome ingrediente
 * @param unit_of_measurement string: unità di misura
 */
export class Ingredient {
    @ApiProperty()
    id: number;
    @ApiProperty()
    id_restaurant: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    unit_of_measurement: string;
}

export enum UnitsOfMeasurement {
    g = 'g',
    ml = 'ml',
    pz = 'pz',
    qb = 'q.b.'
}