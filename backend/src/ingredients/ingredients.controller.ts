import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { ResultIngredientDto } from './dto/result-ingredients.dto';
import { UserType } from '../authentication/dto/user-data.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';


@Controller('ingredients')
export class IngredientsController {
  constructor(
    private readonly ingredientsService: IngredientsService,
    private readonly authorizationService: AuthorizationService
  ) { }

  @Post('create')
  @ApiOperation({ summary: 'Crea un nuovo ingrediente'})
  @ApiResponse({ status: 200, description: 'Ingrediente creato con successo.', type: ResultIngredientDto })
  @ApiBody({ type: CreateIngredientDto })
  async create(@Body() createIngredientDto: CreateIngredientDto, @Req() req): Promise<ResultIngredientDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    createIngredientDto.id_restaurant = parseInt(auth.token.id);
    return await this.ingredientsService.create(createIngredientDto);
  }

  @Get('find-all-by-restaurant')
  @ApiOperation({ summary: 'Cerca tutti gli ingredienti presenti'})
  @ApiResponse({ status: 200, description: 'Ingredienti trovati con successo.', type: ResultIngredientDto })
  async findAllByRestaurantId(@Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const restaurantId = parseInt(auth.token.id)
    return await this.ingredientsService.findAllByRestaurantId(restaurantId);
  }

  @Get('find-one/:id')
  @ApiOperation({ summary: 'Cerca un ingrediente specifico basandosi sul suo ID'})
  @ApiResponse({ status: 200, description: 'Ingrediente trovato con successo.', type: ResultIngredientDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID ingrediente' })
  async findOneByIngredientId(@Param('id') id: string) {
    //const accessToken = req.cookies.accessToken;
    //const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const ingredientId = parseInt(id)
    return await this.ingredientsService.findOneByIngredientId(ingredientId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifica un ingrediente specifico basandosi sul suo ID'})
  @ApiResponse({ status: 200, description: 'Ingrediente modificato con successo.', type: ResultIngredientDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID ingrediente' })
  @ApiBody({ type: UpdateIngredientDto })
  async update(@Param('id') id: string, @Body() updateIngredientDto: UpdateIngredientDto, @Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const ingredientId = parseInt(id)
    return await this.ingredientsService.update(ingredientId, updateIngredientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Rimuove un ingrediente specifico basandosi sul suo ID'})
  @ApiResponse({ status: 200, description: 'Ingrediente rimosso con successo.', type: ResultIngredientDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID ingrediente' })
  async remove(@Param('id') id: string, @Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const ingredientId = parseInt(id)
    return await this.ingredientsService.remove(ingredientId);
  }
}
