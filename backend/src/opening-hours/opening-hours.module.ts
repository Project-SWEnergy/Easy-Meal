import { Module } from '@nestjs/common';
import { OpeningHoursService } from './opening-hours.service';
import { OpeningHoursController } from './opening-hours.controller';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    AuthorizationModule,
    DatabaseModule,
  ],
  controllers: [OpeningHoursController],
  providers: [OpeningHoursService],
})
export class OpeningHoursModule {}
