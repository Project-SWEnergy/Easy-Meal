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
    id_ordered_dish: number;
    id_user: number;
    name_user: string;
    surname_user: string;
    id_reservation: number;
    id_dish: number;
    name_dish: string;
    image_dish: string;
    price_dish: number;
    paid: boolean;
    removed_ingredients?: any[];
}
