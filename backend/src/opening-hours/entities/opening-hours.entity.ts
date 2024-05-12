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
    id: number
    id_restaurant: number
    id_day: number
    name_day: String
    abbreviation_day: String
    order_day: String
    opening_time: String
    closing_time: String
}
