import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

/**
 * @param allergyId number[ ]: id dell'allergia
 */
export class CreateUsersAllergyDto { 
    @IsArray()
    @IsNotEmpty()
    allergyId: number[]
}
