import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateTransactionLogDto {
    @IsNotEmpty()
    @IsInt()
    id_bill: number;

    @IsNotEmpty()
    timestamp: Date;

    @IsNotEmpty()
    @IsString()
    transaction_state: string;

    @IsNotEmpty()
    @IsString()
    message: string;
}
