import { Tag } from "../entities/tag.entity";
import { ApiProperty } from "@nestjs/swagger";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {Tag} data Tag[ ]: oggetti coinvolti nell'operazione.
 */

export class ResultTagDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: Tag[];
}