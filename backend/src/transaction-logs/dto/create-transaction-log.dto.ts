import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateTransactionLogDto {
    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    id_bill: number;

    @IsNotEmpty()
    @ApiProperty()
    timestamp: Date;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    transaction_state: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    message: string;
}
