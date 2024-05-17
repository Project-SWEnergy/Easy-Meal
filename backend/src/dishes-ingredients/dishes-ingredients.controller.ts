import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { DishesIngredientsService } from './dishes-ingredients.service';
import { CreateDishesIngredientDto } from './dto/create-dishes-ingredient.dto';
import { UpdateDishesIngredientDto } from './dto/update-dishes-ingredient.dto';
import { UserType } from '../authentication/dto/user-data.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { ResultDishesIngredientDto } from './dto/result-dishes-ingredients.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('dishes-ingredients')
export class DishesIngredientsController {
  constructor(
    private readonly dishesIngredientsService: DishesIngredientsService,
    private readonly authorizationService: AuthorizationService
  ) { }

  @Post('create')
  @ApiOperation({ summary: 'Crea una nuova associazione tra piatto e ingrediente'})
  @ApiResponse({ status: 200, description: 'Associazione creata con successo.', type: ResultDishesIngredientDto })
  @ApiBody({ type: CreateDishesIngredientDto })
  async create(
    @Body() createDishesIngredientDto: CreateDishesIngredientDto[],
    @Req() req
  ): Promise<ResultDishesIngredientDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    return await this.dishesIngredientsService.create(createDishesIngredientDto);
  }

  @Get('find-all-by-ingredient/:id')
  @ApiOperation({ summary: 'Cerca tutte le associazioni tra piatti e un ingrediente specifico'})
  @ApiResponse({ status: 200, description: 'Associazioni trovate con successo.', type: ResultDishesIngredientDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID ingrediente' })
  async findAllByIngredientId(
    @Param('id') id: string
  ): Promise<ResultDishesIngredientDto> {
    //const accessToken = req.cookies.accessToken;
    //const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const ingredientId = parseInt(id)
    return await this.dishesIngredientsService.findAllByIngredientId(ingredientId);
  }

  @Get('find-all-by-dish/:id')
  @ApiOperation({ summary: 'Cerca tutte le associazioni tra un piatto specifico e gli ingredienti'})
  @ApiResponse({ status: 200, description: 'Associazioni trovate con successo.', type: ResultDishesIngredientDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID piatto' })
  async findAllByDishId(
    @Param('id') id: string
  ): Promise<ResultDishesIngredientDto> {
    //const accessToken = req.cookies.accessToken;
    //const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const dishId = parseInt(id)
    return await this.dishesIngredientsService.findAllByDishId(dishId);
  }

  @Get('find-one/:dishId/:ingredientId')
  @ApiOperation({ summary: 'Cerca una specifica associazione tra piatto e ingrediente'})
  @ApiResponse({ status: 200, description: 'Associazione trovata con successo.', type: ResultDishesIngredientDto })
  @ApiParam({ name: 'dishId', type: 'number', description: 'ID piatto' })
  @ApiParam({ name: 'ingredientId', type: 'number', description: 'ID ingrediente' })
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
  @ApiOperation({ summary: 'Modifica una specifica associazione tra piatto e ingrediente'})
  @ApiResponse({ status: 200, description: 'Associazione modificata con successo.', type: ResultDishesIngredientDto })
  @ApiParam({ name: 'dishId', type: 'number', description: 'ID piatto' })
  @ApiParam({ name: 'ingredientId', type: 'number', description: 'ID ingrediente' })
  @ApiBody({ type: UpdateDishesIngredientDto })
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
  @ApiOperation({ summary: 'Rimuove una specifica associazione tra piatto e ingrediente'})
  @ApiResponse({ status: 200, description: 'Associazione rimossa con successo.', type: ResultDishesIngredientDto })
  @ApiParam({ name: 'dishId', type: 'number', description: 'ID piatto' })
  @ApiParam({ name: 'ingredientId', type: 'number', description: 'ID ingrediente' })
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
