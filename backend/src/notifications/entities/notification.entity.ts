import { ApiProperty } from "@nestjs/swagger";
export class Notification {
    @ApiProperty()
    id: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    message: string;
    @ApiProperty()
    id_receiver: number;
    @ApiProperty()
    role: string;
    @ApiProperty()
    visualized: boolean;
}
