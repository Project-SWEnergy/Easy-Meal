import { Module } from '@nestjs/common';
import { UsersAllergiesService } from './users-allergies.service';
import { UsersAllergiesController } from './users-allergies.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  imports: [
    AuthorizationModule,
    DatabaseModule,
  ],
  controllers: [UsersAllergiesController],
  providers: [UsersAllergiesService],
})
export class UsersAllergiesModule { }
