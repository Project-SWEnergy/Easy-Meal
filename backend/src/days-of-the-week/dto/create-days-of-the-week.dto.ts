import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

/**
 * @param name string: nome giorno della settimana
 * @param abbreviation string: abbreviazione giorno della settimana
 * @param order number: ordine giorno della settimana
 */
export class CreateDaysOfTheWeekDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    abbreviation: string;
    
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    order: number;
}
