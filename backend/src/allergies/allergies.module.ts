import { Module } from '@nestjs/common';
import { AllergiesService } from './allergies.service';
import { AllergiesController } from './allergies.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  imports: [
    AuthorizationModule,
    DatabaseModule,
  ],
  controllers: [AllergiesController],
  providers: [AllergiesService],
})
export class AllergiesModule {}
