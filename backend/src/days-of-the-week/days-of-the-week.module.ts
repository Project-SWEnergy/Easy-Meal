import { Module } from '@nestjs/common';
import { DaysOfTheWeekService } from './days-of-the-week.service';
import { DaysOfTheWeekController } from './days-of-the-week.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [DaysOfTheWeekController],
  providers: [DaysOfTheWeekService],
})
export class DaysOfTheWeekModule {}
