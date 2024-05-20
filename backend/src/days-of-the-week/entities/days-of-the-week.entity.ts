import { ApiProperty } from "@nestjs/swagger";

/**
 * @param id number: identificativo giorno della settimana
 * @param name string: nome giorno della settimana
 * @param abbreviation string: abbreviazione giorno della settimana
 * @param order number: ordine giorno della settimana
 */
export class DaysOfTheWeek {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    abbreviation: string;
    @ApiProperty()
    order: number;
}
