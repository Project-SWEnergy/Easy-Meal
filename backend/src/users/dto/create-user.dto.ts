import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * @param name string: nome utente
 * @param surname string: cognome utente
 * @param email string: email utente
 * @param password string: password utente
 */
export class CreateUserDto { 
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    surname: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @IsString()
    @IsNotEmpty()
    password: string
}
