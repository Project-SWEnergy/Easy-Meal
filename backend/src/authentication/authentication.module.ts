import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseService } from '../database/database.service';


@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({}),
    ConfigModule,
    AuthorizationModule
  ],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
  exports: [AuthenticationService] 

  })
  export class AuthenticationModule {}