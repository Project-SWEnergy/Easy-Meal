import { Review } from "../entities/review.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param data Review[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultReviewsDto {
    result: boolean;
    message: string;
    data: Review[];
}