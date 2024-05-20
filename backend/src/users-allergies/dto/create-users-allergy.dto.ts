import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param allergyId number[ ]: id dell'allergia
 */
export class CreateUsersAllergyDto { 
    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    allergyId: number[]
}
