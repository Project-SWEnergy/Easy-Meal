import { Module } from '@nestjs/common';
import { RestaurantsTagsService } from './restaurants-tags.service';
import { RestaurantsTagsController } from './restaurants-tags.controller';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports : [
    AuthorizationModule,
    DatabaseModule,
  ],
  controllers: [RestaurantsTagsController],
  providers: [RestaurantsTagsService],
})
export class RestaurantsTagsModule {}
