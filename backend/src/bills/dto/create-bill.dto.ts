import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBillDto {
    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    id_user: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    id_reservation: number;

    @IsNotEmpty()
    @ApiProperty()
    date: Date;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    total_bill: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    bill_state: string;

    @IsOptional()
    @IsArray()
    @ApiProperty()
    id_ordered_dishes: number[];
}
