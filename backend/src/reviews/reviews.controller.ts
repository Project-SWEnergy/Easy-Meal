import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserType } from '../authentication/dto/user-data.dto';
import { NotificationsService } from 'src/notifications/notifications.service';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly authorizationService: AuthorizationService,
    private readonly notificationService: NotificationsService
  ) { }

  @Post('create')
  async create(@Body() createReviewDto: CreateReviewDto, @Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    const idUser = parseInt(auth.token.id);
    const review = await this.reviewsService.create(idUser, createReviewDto);
    if (review.data[0].id_restaurant !== undefined) {
      this.reviewsService.sendNotificationUpdate(review.data[0].id_restaurant);
    }
    return review;
  }

  @Get('find-all-by-restaurant/:id')
  async findAllByRestaurantId(@Param('id') id: string) {
    const idRestaurant = parseInt(id);
    return await this.reviewsService.findAllByRestaurantId(idRestaurant);
  }

  @Get('find-all-by-user')
  async findAllByUserId(@Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    return await this.reviewsService.findAllByUserId(auth.token.id);
  }

  @Patch()
  async update(@Body() updateReviewDto: UpdateReviewDto, @Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    const idUser = parseInt(auth.token.id);
    const idRestaurant = updateReviewDto.id_restaurant;
    return await this.reviewsService.update(idUser, idRestaurant, updateReviewDto);
  }

  @Delete(':idRestaurant')
  async remove(@Param('idRestaurant') idRestaurant: string, @Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    const idUser = parseInt(auth.token.id);
    const idRest = parseInt(idRestaurant);
    return await this.reviewsService.remove(idUser, idRest);
  }
}
