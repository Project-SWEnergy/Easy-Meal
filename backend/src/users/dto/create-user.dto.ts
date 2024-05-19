import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param name string: nome utente
 * @param surname string: cognome utente
 * @param email string: email utente
 * @param password string: password utente
 */
export class CreateUserDto { 
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    surname: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string
}
