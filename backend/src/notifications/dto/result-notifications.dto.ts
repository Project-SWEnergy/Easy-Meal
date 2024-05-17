/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param data Notification[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultNotificationsDto {
    result: boolean;
    message: string;
    data: Notification[];
}