import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException } from '@nestjs/common';
import { RestaurantsTagsService } from './restaurants-tags.service';
import { CreateRestaurantsTagDto } from './dto/create-restaurants-tag.dto';
import { UpdateRestaurantsTagDto } from './dto/update-restaurants-tag.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { ResultRestaurantsTagsDto } from './dto/result-restaurants-tags.dto';
import { UserType } from '../authentication/dto/user-data.dto';
import { Request } from 'express';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('restaurants-tags')
export class RestaurantsTagsController {
  constructor(
    private readonly restaurantsTagsService: RestaurantsTagsService,
    private readonly authorizationService: AuthorizationService
  ) { }

  @Post('create')
  @ApiOperation({ summary: 'Crea un nuovo tag per un ristorante' })
  @ApiResponse({ status: 200, description: 'Tag creato con successo.', type: ResultRestaurantsTagsDto })
  @ApiBody({ type: CreateRestaurantsTagDto })
  async create(
    @Body() createRestaurantsTagDto: CreateRestaurantsTagDto,
    @Req() req: Request
  ): Promise<ResultRestaurantsTagsDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant)
    return await this.restaurantsTagsService.create(createRestaurantsTagDto, auth.token.id);
  }

  @Get('find-all-by-restaurant/:id')
  @ApiOperation({ summary: 'Cerca tutti i tag associati ad un ID ristorante' })
  @ApiResponse({ status: 200, description: 'Tag trovati con successo.', type: ResultRestaurantsTagsDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID ristorante' })
  async findAllByRestaurantId(@Param('id') restaurantId): Promise<ResultRestaurantsTagsDto> {
    const restaurantIdNumber = parseInt(restaurantId);
    if (!Number.isInteger(restaurantIdNumber))
      throw new BadRequestException("Invalid restaurant ID");
    return await this.restaurantsTagsService.findAllByRestaurantId(restaurantIdNumber);
  }

  @Patch()
  @ApiOperation({ summary: 'Aggiorna un tag' })
  @ApiResponse({ status: 200, description: 'Tag aggiornato con successo.', type: ResultRestaurantsTagsDto })
  @ApiBody({ type: UpdateRestaurantsTagDto })
  update(
    @Body() updateRestaurantsTagDto: UpdateRestaurantsTagDto,
    @Req() req: Request
  ): Promise<ResultRestaurantsTagsDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant)
    return this.restaurantsTagsService.update(auth.token.id, updateRestaurantsTagDto);
  }

}
