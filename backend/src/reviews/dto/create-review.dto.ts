import { ApiProperty } from "@nestjs/swagger";
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
    @ApiProperty()
    id_restaurant: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    id_user: number;

    @IsNotEmpty()
    @ApiProperty()
    date: Date;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    score: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;
}
