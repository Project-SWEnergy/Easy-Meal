import { ApiProperty } from "@nestjs/swagger";
import { Bill } from "../entities/bill.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {ReturnBill} data ReturnBill[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultBillDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: Bill[];
}