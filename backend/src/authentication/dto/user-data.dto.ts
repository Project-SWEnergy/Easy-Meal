import { ApiProperty } from "@nestjs/swagger";
/**
 * @param id number: identificativo utente
 * @param role: UserType: tipologia di utente.
 */
export class UserDataDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    role: UserType;
}


export enum UserType {
    user = 'user',
    restaurant = 'restaurant'
}