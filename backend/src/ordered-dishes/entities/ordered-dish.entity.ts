import { ApiProperty } from "@nestjs/swagger";
/**
 * @param id_ordered_dish number: id piatto ordinato
 * @param id_user number: id utente
 * @param name_user string: nome utente
 * @param surname_user string: cognome utente
 * @param id_reservation number: id prenotazione
 * @param id_dish number: id piatto
 * @param name_dish string: nome piatto
 * @param image_dish string: URL piatto
 * @param price_dish number: prezzo piatto
 * @param paid boolean: indica se il piatto è stato pagato
 * @param removed_ingredients any[ ]: ingredienti rimossi
 */
export class OrderedDish {
    @ApiProperty()
    id_ordered_dish: number;
    @ApiProperty()
    id_user: number;
    @ApiProperty()
    name_user: string;
    @ApiProperty()
    surname_user: string;
    @ApiProperty()
    id_reservation: number;
    @ApiProperty()
    id_dish: number;
    @ApiProperty()
    name_dish: string;
    @ApiProperty()
    image_dish: string;
    @ApiProperty()
    price_dish: number;
    @ApiProperty()
    paid: boolean;
    @ApiProperty()
    removed_ingredients?: any[];
}
