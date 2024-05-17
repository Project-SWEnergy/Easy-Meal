import { PartialType } from '@nestjs/swagger';
import { CreateDishesIngredientDto } from './create-dishes-ingredient.dto';

export class UpdateDishesIngredientDto extends PartialType(CreateDishesIngredientDto) {}
