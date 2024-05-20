import { ApiProperty } from "@nestjs/swagger";
/**
 * @param id number: identificativo della riga.
 * @param name string: nome del tag.
 * @param description? string: descrizione del tag.
 */
export class Tag {
    @ApiProperty()
    id: number
    @ApiProperty()
    name: string
    @ApiProperty()
    description?: string
}
