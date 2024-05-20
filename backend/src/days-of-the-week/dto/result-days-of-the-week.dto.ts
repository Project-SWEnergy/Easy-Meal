/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param data DaysOfTheWeek[ ]: oggetti coinvolti nell'operazione.
 */

import { ApiProperty } from "@nestjs/swagger";
import { DaysOfTheWeek } from "../entities/days-of-the-week.entity";

export class ResultDaysOfTheWeekDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: DaysOfTheWeek[];
}