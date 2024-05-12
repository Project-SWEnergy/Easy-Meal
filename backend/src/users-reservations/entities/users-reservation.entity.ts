/**
 * @param id_user number: id utente
 * @param name_user string?: nome utente
 * @param surname_user string?: cognome utente
 * @param id_reservation number: id prenotazione
 * @param id_restaurant number?: id ristorante
 * @param name_restaurant string?: nome ristorante
 * @param date Date?: data della prenotazione
 * @param partecipants number?: numero dei partecipanti
 * @param state string?: stato della prenotazione
 * @param bill_splitting_method string?: metodo di divisione del conto
 * @param accepted boolean?: se l'invito alla prenotazione è accettato o in attesa
 */
export class UsersReservation {
    id_user: number;
    name_user?: string;
    surname_user?: string;
    id_reservation: number;
    id_restaurant?: number
    name_restaurant?: string;
    date?: Date;
    partecipants?: number;
    state?: string;
    bill_splitting_method?: string;
    accepted?: boolean;
}
