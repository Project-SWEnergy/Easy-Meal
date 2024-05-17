import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { DishesIngredientsService } from './dishes-ingredients.service';
import { CreateDishesIngredientDto } from './dto/create-dishes-ingredient.dto';
import { UpdateDishesIngredientDto } from './dto/update-dishes-ingredient.dto';
import { UserType } from '../authentication/dto/user-data.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { ResultDishesIngredientDto } from './dto/result-dishes-ingredients.dto';

@Controller('dishes-ingredients')
export class DishesIngredientsController {
  constructor(
    private readonly dishesIngredientsService: DishesIngredientsService,
    private readonly authorizationService: AuthorizationService
  ) { }

  @Post('create')
  async create(
    @Body() createDishesIngredientDto: CreateDishesIngredientDto[],
    @Req() req
  ): Promise<ResultDishesIngredientDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    return await this.dishesIngredientsService.create(createDishesIngredientDto);
  }

  @Get('find-all-by-ingredient/:id')
  async findAllByIngredientId(
    @Param('id') id: string
  ): Promise<ResultDishesIngredientDto> {
    //const accessToken = req.cookies.accessToken;
    //const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const ingredientId = parseInt(id)
    return await this.dishesIngredientsService.findAllByIngredientId(ingredientId);
  }

  @Get('find-all-by-dish/:id')
  async findAllByDishId(
    @Param('id') id: string
  ): Promise<ResultDishesIngredientDto> {
    //const accessToken = req.cookies.accessToken;
    //const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const dishId = parseInt(id)
    return await this.dishesIngredientsService.findAllByDishId(dishId);
  }

  @Get('find-one/:dishId/:ingredientId')
  async findOne(
    @Param('dishId') dishId: string,
    @Param('ingredientId') ingredientId: string
  ): Promise<ResultDishesIngredientDto> {
    //const accessToken = req.cookies.accessToken;
    //const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const ingId = parseInt(ingredientId)
    const disId = parseInt(dishId)
    return await this.dishesIngredientsService.findOne(disId, ingId);
  }

  @Patch(':dishId/:ingredientId')
  async update(
    @Param('dishId') dishId: string,
    @Param('ingredientId') ingredientId: string,
    @Body() updateDishesIngredientDto: UpdateDishesIngredientDto,
    @Req() req)
    : Promise<ResultDishesIngredientDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const ingId = parseInt(ingredientId)
    const disId = parseInt(dishId)
    return await this.dishesIngredientsService.update(disId, ingId, updateDishesIngredientDto);
  }

  @Delete(':dishId/:ingredientId')
  async remove(
    @Param('dishId') dishId: string,
    @Param('ingredientId') ingredientId: string,
    @Req() req)
    : Promise<ResultDishesIngredientDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const ingId = parseInt(ingredientId)
    const disId = parseInt(dishId)
    return await this.dishesIngredientsService.remove(disId, ingId);
  }
}
