import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException } from '@nestjs/common';
import { RestaurantsTagsService } from './restaurants-tags.service';
import { CreateRestaurantsTagDto } from './dto/create-restaurants-tag.dto';
import { UpdateRestaurantsTagDto } from './dto/update-restaurants-tag.dto';
import { AuthorizationService } from 'src/authorization/authorization.service';
import { ResultRestaurantsTagsDto } from './dto/result-restaurants-tags.dto';
import { UserType } from 'src/authentication/dto/user-data.dto';
import { Request } from 'express';

@Controller('restaurants-tags')
export class RestaurantsTagsController {
  constructor(
    private readonly restaurantsTagsService: RestaurantsTagsService,
    private readonly authorizationService: AuthorizationService
  ) { }

  @Post('create')
  async create(
    @Body() createRestaurantsTagDto: CreateRestaurantsTagDto,
    @Req() req: Request
  ): Promise<ResultRestaurantsTagsDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant)
    return await this.restaurantsTagsService.create(createRestaurantsTagDto, auth.token.id);
  }

  @Get('find-all-by-restaurant/:id')
  async findAllByRestaurantId(@Param('id') restaurantId): Promise<ResultRestaurantsTagsDto> {
    const restaurantIdNumber = parseInt(restaurantId);
    if (!Number.isInteger(restaurantIdNumber))
      throw new BadRequestException("Invalid restaurant ID");
    return await this.restaurantsTagsService.findAllByRestaurantId(restaurantIdNumber);
  }

  @Patch()
  update(
    @Body() updateRestaurantsTagDto: UpdateRestaurantsTagDto,
    @Req() req: Request
  ): Promise<ResultRestaurantsTagsDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant)
    return this.restaurantsTagsService.update(auth.token.id, updateRestaurantsTagDto);
  }

}
