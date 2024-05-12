import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

/**
 * @param restaurantId number: id del ristorante
 * @param date Date: timestamp con timezone della prenotazione
 * @param partecipants number: numero di partecipanti
 * @param reservationState string: stato della prenotazione
 * @param billSplittingMethod string: metodo di pagamento (opzionale)
 */
export class CreateReservationDto {
    @IsInt()
    @IsNotEmpty()
    restaurantId: number;

    @IsNotEmpty()
    date: Date;

    @IsInt()
    @IsNotEmpty()
    partecipants: number;

    @IsNotEmpty()
    @IsString()
    reservation_state: string;

    @IsNotEmpty()
    @IsString()
    bill_splitting_method: string;

    @IsInt()
    @IsOptional()
    paid_orders: number;
}
