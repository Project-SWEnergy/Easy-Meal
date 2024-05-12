import { ApiProperty } from "@nestjs/swagger";

/**
 * @param id number: identificativo della riga.
 * @param name string: nome dell'allergia.
 * @param icon string: URL da cui ricavare l'icona necessaria.
 */
export class Allergy {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    icon: string;
}
