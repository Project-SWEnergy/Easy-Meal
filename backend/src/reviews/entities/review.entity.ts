/**
 * @param id_user number: id utente
 * @param name_user string?: nome utente
 * @param id_restaurant number: id ristorante
 * @param name_restaurant string?: nome ristorante
 * @param date Date: data inserimento recensione
 * @param score number: punteggio assegnato alla recensione
 * @param description string: testo della recensione
 */
export class Review {
    id_user: number;
    name_user?: string
    id_restaurant: number;
    name_restaurant?: string;
    date: Date;
    score: number;
    description: string;
}
