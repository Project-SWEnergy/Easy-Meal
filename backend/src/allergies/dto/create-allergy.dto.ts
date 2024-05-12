import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

/**
 * @param name string: nome dell'allergia.
 * @param icon string: URL da cui ricavare l'icona necessaria.
 */
export class CreateAllergyDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    icon: string;
}
