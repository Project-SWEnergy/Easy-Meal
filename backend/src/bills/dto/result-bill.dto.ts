import { Bill } from "../entities/bill.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {ReturnBill} data ReturnBill[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultBillDto {
    result: boolean;
    message: string;
    data: Bill[];
}