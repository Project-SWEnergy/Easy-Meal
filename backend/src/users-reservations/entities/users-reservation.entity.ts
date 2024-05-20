import { ApiProperty } from "@nestjs/swagger";
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
    @ApiProperty()
    id_user: number;
    @ApiProperty()
    name_user?: string;
    @ApiProperty()
    surname_user?: string;
    @ApiProperty()
    id_reservation: number;
    @ApiProperty()
    id_restaurant?: number
    @ApiProperty()
    name_restaurant?: string;
    @ApiProperty()
    date?: Date;
    @ApiProperty()
    partecipants?: number;
    @ApiProperty()
    state?: string;
    @ApiProperty()
    bill_splitting_method?: string;
    @ApiProperty()
    accepted?: boolean;
}
