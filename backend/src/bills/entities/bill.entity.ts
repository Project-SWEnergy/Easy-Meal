import { ApiProperty } from "@nestjs/swagger";
import { BillDetails } from "./bill-details.entity";

export class Bill {
    @ApiProperty()
    id: number;
    @ApiProperty()
    id_user: number;
    @ApiProperty()
    name_user: string;
    @ApiProperty()
    surname_user: string;
    @ApiProperty()
    id_reservation: number;
    @ApiProperty()
    date: Date;
    @ApiProperty()
    total_bill: number;
    @ApiProperty()
    bill_state: string;
    @ApiProperty()
    bill_details: BillDetails[]
}

export enum BillState {
    InCorso = 'In corso',
    Rifiutato = 'Rifiutato',
    Concluso = 'Concluso'
};