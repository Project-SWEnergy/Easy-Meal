import { IsArray, IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBillDto {
    @IsNotEmpty()
    @IsInt()
    id_user: number;

    @IsNotEmpty()
    @IsInt()
    id_reservation: number;

    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    @IsNumber()
    total_bill: number;

    @IsNotEmpty()
    @IsString()
    bill_state: string;

    @IsOptional()
    @IsArray()
    id_ordered_dishes: number[];
}
