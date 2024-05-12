import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

/**
 * @param id_restaurant number: id ristorante
 * @param id_user number?: id utente
 * @param date Date: data inserimento recensione
 * @param score number: punteggio assegnato alla recensione
 * @param description string: testo della recensione
 */
export class CreateReviewDto {

    @IsNumber()
    @IsNotEmpty()
    id_restaurant: number;

    @IsNumber()
    @IsOptional()
    id_user: number;

    @IsNotEmpty()
    date: Date;

    @IsNumber()
    @IsNotEmpty()
    score: number;

    @IsString()
    @IsNotEmpty()
    description: string;
}
