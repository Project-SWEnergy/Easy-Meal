import { PartialType } from '@nestjs/swagger';
import { CreateDaysOfTheWeekDto } from './create-days-of-the-week.dto';

export class UpdateDaysOfTheWeekDto extends PartialType(CreateDaysOfTheWeekDto) {}
