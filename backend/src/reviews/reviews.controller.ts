import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserType } from '../authentication/dto/user-data.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ResultReviewsDto } from './dto/result-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly authorizationService: AuthorizationService
  ) { }

  @Post('create')
  @ApiOperation({ summary: 'Crea una nuova recensione'})
  @ApiResponse({ status: 200, description: 'Recensione creata con successo.', type: ResultReviewsDto })
  @ApiBody({ type: CreateReviewDto })
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
  @ApiOperation({ summary: 'Cerca tutte le recensioni associate ad un ID ristorante'})
  @ApiResponse({ status: 200, description: 'Recensioni trovate con successo.', type: ResultReviewsDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID ristorante' })
  async findAllByRestaurantId(@Param('id') id: string) {
    const idRestaurant = parseInt(id);
    return await this.reviewsService.findAllByRestaurantId(idRestaurant);
  }

  @Get('find-all-by-user')
  @ApiOperation({ summary: 'Cerca tutte le recensioni associate ad un ID utente'})
  @ApiResponse({ status: 200, description: 'Recensioni trovate con successo.', type: ResultReviewsDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID utente' })
  async findAllByUserId(@Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    return await this.reviewsService.findAllByUserId(auth.token.id);
  }

  @Patch()
  @ApiOperation({ summary: 'Modifica una specifica recensione basandosi sul suo ID'})
  @ApiResponse({ status: 200, description: 'Recensione modificata con successo.', type: ResultReviewsDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID recensione' })
  @ApiBody({ type: UpdateReviewDto })
  async update(@Body() updateReviewDto: UpdateReviewDto, @Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    const idUser = parseInt(auth.token.id);
    const idRestaurant = updateReviewDto.id_restaurant;
    return await this.reviewsService.update(idUser, idRestaurant, updateReviewDto);
  }

  @Delete(':idRestaurant')
  @ApiOperation({ summary: 'Rimuove una specifica recensione basandosi su ID ristorante ed ID utente'})
  @ApiResponse({ status: 200, description: 'Recensione rimossa con successo.', type: ResultReviewsDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID ristorante' })
  async remove(@Param('idRestaurant') idRestaurant: string, @Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    const idUser = parseInt(auth.token.id);
    const idRest = parseInt(idRestaurant);
    return await this.reviewsService.remove(idUser, idRest);
  }
}
