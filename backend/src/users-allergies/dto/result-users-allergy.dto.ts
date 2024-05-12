import { UsersAllergy } from "../entities/users-allergy.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {UsersAllergy} data UsersAllergy[ ]: oggetto coinvolto nell'operazione.
 */
export class ResultUserAllergiesDto {
    result: boolean;
    message: string;
    data: UsersAllergy[];
}