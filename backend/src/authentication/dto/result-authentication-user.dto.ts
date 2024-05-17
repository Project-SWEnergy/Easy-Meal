import { UserDataDto } from "./user-data.dto";
/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {UserDataDto} user  UserDataDto: informazioni relative all'utente.
 */
export class ResultAuthenticationDto {
    result: boolean;
    message: string;
    user: UserDataDto;
}
