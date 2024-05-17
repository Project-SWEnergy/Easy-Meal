export class TransactionLog {
    id: number;
    id_bill: number;
    timestamp: Date;
    transaction_state: string;
    message: string;
}

export enum TransactionState {
    InCorso = 'In corso',
    Rifiutato = 'Rifiutato',
    Concluso = 'Concluso'
}