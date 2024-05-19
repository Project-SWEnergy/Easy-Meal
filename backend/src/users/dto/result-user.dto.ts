import { User } from "../entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {User} data User[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultUserDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: User[];
}