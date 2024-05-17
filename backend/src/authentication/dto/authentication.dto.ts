import { IsNotEmpty, IsString } from "class-validator";

/**
 * @param email string: email identificativa dell'utente.
 * @param password string: password per l'autenticazione.
 */
export class AuthenticationDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
