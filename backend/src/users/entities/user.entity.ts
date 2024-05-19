import { ApiProperty } from "@nestjs/swagger";
/**
 * @param id number: identificativo della riga.
 * @param name string: nome dell'utente.
 * @param surname string: cognome dell'utente.
 * @param email: string: email dell'utente.
 * @param password: string: password dell'utente.
 */
export class User {
    @ApiProperty()
    id: number
    @ApiProperty()
    name: string
    @ApiProperty()
    surname: string
    @ApiProperty()
    email: string
    @ApiProperty()
    password?: string
}
