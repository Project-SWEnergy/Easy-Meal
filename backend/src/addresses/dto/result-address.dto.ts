import { ApiProperty } from "@nestjs/swagger";
import { Address } from "../entities/address.entity";


/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {Address} data Address[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultAddressDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: Address[];
}