import { OpeningHours } from "../entities/opening-hours.entity";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {OpeningHours} data OpeningHours[ ]: oggetti coinvolti nell'operazione.
 */

export class ResultOpeningHoursDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: OpeningHours[];
}