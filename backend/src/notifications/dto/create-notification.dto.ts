/**
 * @param title string: titolo
 * @param message string: messaggio
 * @param id_receiver number: id destinatario della notifica
 * @param role string: indica se il destinatario è un user o un restaurant
 */
export class CreateNotificationDto {
    title: string;
    message: string;
    id_receiver: number;
    role: string;
}
