import { ApiProperty } from "@nestjs/swagger";
/**
 * @param userId number: id utente
 * @param allergyId number: id allergia
 * @param allergyName string: nome assegnato all'allergia
 */
export class UsersAllergy {
    @ApiProperty()
    userId: number;
    @ApiProperty()
    allergyId: number;
    @ApiProperty()
    allergyName: string;
}
