import { Module } from '@nestjs/common';
import { AllergiesIngredientsService } from './allergies-ingredients.service';
import { AllergiesIngredientsController } from './allergies-ingredients.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  imports: [
    AuthorizationModule,
    DatabaseModule,
  ],
  controllers: [AllergiesIngredientsController],
  providers: [AllergiesIngredientsService],
})
export class AllergiesIngredientsModule {}
