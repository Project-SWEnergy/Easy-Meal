/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param data DaysOfTheWeek[ ]: oggetti coinvolti nell'operazione.
 */

import { DaysOfTheWeek } from "../entities/days-of-the-week.entity";

export class ResultDaysOfTheWeekDto {
    result: boolean;
    message: string;
    data: DaysOfTheWeek[];
}