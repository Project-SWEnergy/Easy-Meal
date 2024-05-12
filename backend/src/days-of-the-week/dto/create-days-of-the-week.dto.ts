import { IsInt, IsNotEmpty, IsString } from "class-validator";

/**
 * @param name string: nome giorno della settimana
 * @param abbreviation string: abbreviazione giorno della settimana
 * @param order number: ordine giorno della settimana
 */
export class CreateDaysOfTheWeekDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    abbreviation: string;
    
    @IsInt()
    @IsNotEmpty()
    order: number;
}
