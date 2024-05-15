import { ApiProperty } from "@nestjs/swagger";

/**
 * @param id number: identificativo della riga.
 * @param city string : nome della città.
 * @param street string: nome della via.
 * @param street_number string: numero civico.
 * @param state string: nome dello stato.
 * @param zip_code string:  codice postale.
 */
export class Address {
    @ApiProperty()
    id: number;
    @ApiProperty()
    city: string;
    @ApiProperty()
    street: string;
    @ApiProperty()
    street_number: string;
    @ApiProperty()
    state: string;
    @ApiProperty()
    zip_code: string;
}
