import { OpeningHours } from "../entities/opening-hours.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {OpeningHours} data OpeningHours[ ]: oggetti coinvolti nell'operazione.
 */

export class ResultOpeningHoursDto {
    result: boolean;
    message: string;
    data: OpeningHours[];
}