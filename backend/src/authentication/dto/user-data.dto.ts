/**
 * @param id number: identificativo utente
 * @param role: UserType: tipologia di utente.
 */
export class UserDataDto {
    id: number;
    role: UserType;
}


export enum UserType {
    user = 'user',
    restaurant = 'restaurant'
}