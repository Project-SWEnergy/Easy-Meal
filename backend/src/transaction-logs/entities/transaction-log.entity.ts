import { ApiProperty } from "@nestjs/swagger";
export class TransactionLog {
    @ApiProperty()
    id: number;
    @ApiProperty()
    id_bill: number;
    @ApiProperty()
    timestamp: Date;
    @ApiProperty()
    transaction_state: string;
    @ApiProperty()
    message: string;
}

export enum TransactionState {
    InCorso = 'In corso',
    Rifiutato = 'Rifiutato',
    Concluso = 'Concluso'
}