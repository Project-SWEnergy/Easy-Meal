import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { AddressesModule } from 'src/addresses/addresses.module';
import { AddressesService } from 'src/addresses/addresses.service';
import { UploadFileService } from 'src/upload-file/upload-file.service';

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
