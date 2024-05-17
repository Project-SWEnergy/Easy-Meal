import { Address } from "../entities/address.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {Address} data Address[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultAddressDto {
    result: boolean;
    message: string;
    data: Address[];
}