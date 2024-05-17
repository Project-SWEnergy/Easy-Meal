import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantsTagDto } from './create-restaurants-tag.dto';

export class UpdateRestaurantsTagDto extends PartialType(CreateRestaurantsTagDto) {}
