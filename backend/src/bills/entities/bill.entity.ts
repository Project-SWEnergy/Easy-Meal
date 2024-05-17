import { BillDetails } from "./bill-details.entity";

export class Bill {
    id: number;
    id_user: number;
    name_user: string;
    surname_user: string;
    id_reservation: number;
    date: Date;
    total_bill: number;
    bill_state: string;
    bill_details: BillDetails[]
}

export enum BillState {
    InCorso = 'In corso',
    Rifiutato = 'Rifiutato',
    Concluso = 'Concluso'
};