import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersAllergyDto } from './create-users-allergy.dto';

export class UpdateUsersAllergyDto extends PartialType(CreateUsersAllergyDto) {}
