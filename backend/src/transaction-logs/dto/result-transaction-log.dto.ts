import { TransactionLog } from "../entities/transaction-log.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {Tag} data TransactionLog[ ]: oggetti coinvolti nell'operazione.
 */

export class ResultTransactionLogDto {
    result: boolean;
    message: string;
    data: TransactionLog[];
}