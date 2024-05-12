import { PartialType } from '@nestjs/swagger';
import { CreateAllergiesIngredientDto } from './create-allergies-ingredient.dto';

export class UpdateAllergiesIngredientDto extends PartialType(CreateAllergiesIngredientDto) {}
