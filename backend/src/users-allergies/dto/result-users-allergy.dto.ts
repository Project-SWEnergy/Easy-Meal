import { UsersAllergy } from "../entities/users-allergy.entity";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {UsersAllergy} data UsersAllergy[ ]: oggetto coinvolto nell'operazione.
 */
export class ResultUserAllergiesDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: UsersAllergy[];
}