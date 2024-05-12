import { User } from "../entities/user.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {User} data User[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultUserDto {
    result: boolean;
    message: string;
    data: User[];
}