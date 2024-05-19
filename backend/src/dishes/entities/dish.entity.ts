import { ApiProperty } from "@nestjs/swagger";
/**
 * @param id number: identificativo piatto
 * @param id_restaurant number: identificativo ristorante
 * @param name string: nome piatto
 * @param description string: descrizione piatto
 * @param price number: prezzo piatto
 * @param image string: URL immagine
 */
export class Dish { 
    @ApiProperty()
    id: number;
    @ApiProperty()
    id_restaurant: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    price: number; 
    @ApiProperty()
    image: string;
}
