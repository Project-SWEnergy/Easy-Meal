import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { Allergy } from "../entities/allergy.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {Allergy} data Allergy[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultAllergyDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: Allergy[];
}