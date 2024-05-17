import { Tag } from "../entities/tag.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {Tag} data Tag[ ]: oggetti coinvolti nell'operazione.
 */

export class ResultTagDto {
    result: boolean;
    message: string;
    data: Tag[];
}