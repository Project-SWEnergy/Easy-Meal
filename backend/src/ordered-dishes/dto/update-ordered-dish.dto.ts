import { PartialType } from '@nestjs/swagger';
import { CreateOrderedDishDto } from './create-ordered-dish.dto';

export class UpdateOrderedDishDto extends PartialType(CreateOrderedDishDto) {}
