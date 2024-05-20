import { ApiProperty } from "@nestjs/swagger";
/**
 * @param title string: titolo
 * @param message string: messaggio
 * @param id_receiver number: id destinatario della notifica
 * @param role string: indica se il destinatario è un user o un restaurant
 */
export class CreateNotificationDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    message: string;
    @ApiProperty()
    id_receiver: number;
    @ApiProperty()
    role: string;
}
