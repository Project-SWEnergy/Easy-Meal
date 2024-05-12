import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import * as cookieParser from 'cookie-parser';


@Module({
  imports: [
    AuthorizationModule,
    AuthenticationModule,
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
