import { PartialType } from '@nestjs/swagger';
import { CreateOpeningHoursDto } from './create-opening-hours.dto';

export class UpdateOpeningHoursDto extends PartialType(CreateOpeningHoursDto) {}
