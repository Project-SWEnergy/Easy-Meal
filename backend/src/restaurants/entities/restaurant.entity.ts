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
    id: number;
    email: string;
    password?: string;
    name: string;
    owner_name: string;
    owner_surname: string;
    id_address: number;
    address_city: string;
    address_street: string;
    address_street_number: string;
    address_state: string;
    address_zip_code: string;
    seats: number;
    website?: string;
    price_tier: number;
    description: string;
    phone: string;
    children_seats?: number;
    accessibility?: boolean;
    logo?: string;
    banner_image?: string;
}
