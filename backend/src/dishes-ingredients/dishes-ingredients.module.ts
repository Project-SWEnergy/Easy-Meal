import { Module } from '@nestjs/common';
import { DishesIngredientsService } from './dishes-ingredients.service';
import { DishesIngredientsController } from './dishes-ingredients.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  imports: [
    AuthorizationModule,
    DatabaseModule,
  ],
  controllers: [DishesIngredientsController],
  providers: [DishesIngredientsService],
})
export class DishesIngredientsModule {}
