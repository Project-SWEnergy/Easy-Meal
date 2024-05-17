import { ApiProperty } from "@nestjs/swagger";
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
    @ApiProperty()
    restaurantId: number;

    @IsNotEmpty()
    @ApiProperty()
    date: Date;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    partecipants: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    reservation_state: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    bill_splitting_method: string;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    paid_orders: number;
}
