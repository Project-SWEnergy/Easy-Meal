import { ApiProperty } from "@nestjs/swagger";
import { UserDataDto } from "./user-data.dto";
/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {UserDataDto} user  UserDataDto: informazioni relative all'utente.
 */
export class ResultAuthenticationDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    user: UserDataDto;
}
