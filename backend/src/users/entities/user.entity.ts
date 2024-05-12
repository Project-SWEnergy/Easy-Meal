/**
 * @param id number: identificativo della riga.
 * @param name string: nome dell'utente.
 * @param surname string: cognome dell'utente.
 * @param email: string: email dell'utente.
 * @param password: string: password dell'utente.
 */
export class User {
    id: number
    name: string
    surname: string
    email: string
    password?: string
}
