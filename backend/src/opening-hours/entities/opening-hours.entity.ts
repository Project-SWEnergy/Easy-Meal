import { ApiProperty } from "@nestjs/swagger";
/**
 * @param id number: identificativo della riga.
 * @param id_restaurant number: identificativo del ristorante.
 * @param id_day number: identificativo del giorno.
 * @param name_day string: nome del giorno.
 * @param abbreviation_day string: abbreviazione del giorno.
 * @param order_day string: ordine in elenco del giorno.
 * @param opening_time string: orario di apertura.
 * @param closing_time string: orario di chiusura.
 */
export class OpeningHours {
    @ApiProperty()
    id: number
    @ApiProperty()
    id_restaurant: number
    @ApiProperty()
    id_day: number
    @ApiProperty()
    name_day: String
    @ApiProperty()
    abbreviation_day: String
    @ApiProperty()
    order_day: String
    @ApiProperty()
    opening_time: String
    @ApiProperty()
    closing_time: String
}
