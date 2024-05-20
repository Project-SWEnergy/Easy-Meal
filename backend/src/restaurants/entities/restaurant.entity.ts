import { ApiProperty } from "@nestjs/swagger";
/** 
* @param id number: identificativo della riga.
* @param email string: email del ristorante.
* @param password? string: password del ristorante.
* @param name string: nome del ristorante.
* @param owner_name string: nome del proprietario del ristorante.
* @param owner_surname string: cognome del proprietario del ristorante.
* @param id_address number: identificativo dell'indirizzo del ristorante.
* @param address_city string
* @param address_street string
* @param address_street_number string
* @param address_state string
* @param address_zip_code string
* @param seats number: numero di posti del ristorante.
* @param website? string: sito web del ristorante.
* @param price_tier number: fascia di prezzo del ristorante.
* @param description string: descrizione del ristorante.
* @param phone string: numero di telefono del ristorante.
* @param childre_seats? number: numero di posti per bambini del ristorante.
* @param accessibility? boolean: accessibilità del ristorante.
* @param logo? string: logo del ristorante.
* @param banner_image? string: immagine di copertina del ristorante.
*/
export class Restaurant {
    @ApiProperty()
    id: number;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password?: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    owner_name: string;
    @ApiProperty()
    owner_surname: string;
    @ApiProperty()
    id_address: number;
    @ApiProperty()
    address_city: string;
    @ApiProperty()
    address_street: string;
    @ApiProperty()
    address_street_number: string;
    @ApiProperty()
    address_state: string;
    @ApiProperty()
    address_zip_code: string;
    @ApiProperty()
    seats: number;
    @ApiProperty()
    website?: string;
    @ApiProperty()
    price_tier: number;
    @ApiProperty()
    description: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    children_seats?: number;
    @ApiProperty()
    accessibility?: boolean;
    @ApiProperty()
    logo?: string;
    @ApiProperty()
    banner_image?: string;
}
