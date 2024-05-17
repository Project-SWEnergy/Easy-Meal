import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  imports: [
    AuthorizationModule,
    DatabaseModule,
  ],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}
