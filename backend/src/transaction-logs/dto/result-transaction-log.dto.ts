import { TransactionLog } from "../entities/transaction-log.entity";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {Tag} data TransactionLog[ ]: oggetti coinvolti nell'operazione.
 */

export class ResultTransactionLogDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: TransactionLog[];
}