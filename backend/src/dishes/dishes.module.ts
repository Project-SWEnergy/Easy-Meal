import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { UploadFileModule } from 'src/upload-file/upload-file.module';

@Module({
  imports: [
    AuthorizationModule,
    DatabaseModule,
    UploadFileModule
  ],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {}
