import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllergiesModule } from './allergies/allergies.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { UsersAllergiesModule } from './users-allergies/users-allergies.module';
import { AddressesModule } from './addresses/addresses.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { TagsModule } from './tags/tags.module';
import { ReservationsModule } from './reservations/reservations.module';
import { DishesModule } from './dishes/dishes.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { DishesIngredientsModule } from './dishes-ingredients/dishes-ingredients.module';
import { RestaurantsTagsModule } from './restaurants-tags/restaurants-tags.module';
import { OpeningHoursModule } from './opening-hours/opening-hours.module';
import { AllergiesIngredientsModule } from './allergies-ingredients/allergies-ingredients.module';
import { DaysOfTheWeekModule } from './days-of-the-week/days-of-the-week.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersReservationsModule } from './users-reservations/users-reservations.module';
import { OrderedDishesModule } from './ordered-dishes/ordered-dishes.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadFileModule } from './upload-file/upload-file.module';
import { BillsModule } from './bills/bills.module';
import { TransactionLogsModule } from './transaction-logs/transaction-logs.module';
import { NotificationsModule } from './notifications/notifications.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../resources'),
      serveRoot:'/resources' 
    }),
    AllergiesModule,
    UsersAllergiesModule,
    UsersModule,
    AddressesModule,
    RestaurantsModule,
    TagsModule,
    ReservationsModule,
    DishesModule,
    AuthorizationModule,
    IngredientsModule,
    DishesIngredientsModule,
    RestaurantsTagsModule,
    OpeningHoursModule,
    AllergiesIngredientsModule,
    DaysOfTheWeekModule,
    ReviewsModule,
    UsersReservationsModule,
    OrderedDishesModule,
    UploadFileModule,
    BillsModule,
    TransactionLogsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
