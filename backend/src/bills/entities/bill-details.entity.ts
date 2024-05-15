import { ApiProperty } from "@nestjs/swagger";

export class BillDetails { 
    @ApiProperty()
    id: number;
    @ApiProperty()
    id_ordered_dish: number;
    @ApiProperty()
    name_ordered_dish: string;
    @ApiProperty()
    price_ordered_dish: number;
    @ApiProperty()
    id_bill: number;
}