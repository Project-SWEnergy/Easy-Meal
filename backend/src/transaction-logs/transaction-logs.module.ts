import { Module } from '@nestjs/common';
import { TransactionLogsService } from './transaction-logs.service';
import { TransactionLogsController } from './transaction-logs.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  imports: [
    AuthorizationModule,
    DatabaseModule,
  ],
  controllers: [TransactionLogsController],
  providers: [TransactionLogsService],
})
export class TransactionLogsModule {}
