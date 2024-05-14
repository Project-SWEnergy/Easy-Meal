import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseModule } from '../database/database.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AddressesModule } from '../addresses/addresses.module';
import { AddressesService } from '../addresses/addresses.service';
import { UploadFileService } from '../upload-file/upload-file.service';

@Module({
  imports: [
    AuthorizationModule,
    AuthenticationModule,
    DatabaseModule,
    AddressesModule
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, AddressesService, UploadFileService],
})
export class RestaurantsModule {}
