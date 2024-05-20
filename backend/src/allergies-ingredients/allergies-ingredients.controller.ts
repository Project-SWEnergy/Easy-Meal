import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AllergiesIngredientsService } from './allergies-ingredients.service';
import { CreateAllergiesIngredientDto } from './dto/create-allergies-ingredient.dto';
import { UpdateAllergiesIngredientDto } from './dto/update-allergies-ingredient.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserType } from '../authentication/dto/user-data.dto';
import { ResultAllergiesIngredientDto } from './dto/result-allergies-ingredient.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('allergies-ingredients')
export class AllergiesIngredientsController {
  constructor(
    private readonly allergiesIngredientsService: AllergiesIngredientsService,
    private readonly authorizationService: AuthorizationService
  ) { }

  @Post('create')
  @ApiOperation({ summary: 'Crea una nuova allergia-ingrediente' })
  @ApiResponse({ status: 200, description: 'Allergia-ingrediente creata con successo.', type: ResultAllergiesIngredientDto })
  @ApiBody({ type: CreateAllergiesIngredientDto })
  async create(
    @Body() createAllergiesIngredientDto: CreateAllergiesIngredientDto,
    @Req() req
  ): Promise<ResultAllergiesIngredientDto> {
      const accessToken = req.cookies.accessToken;
      const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
      return await this.allergiesIngredientsService.create(createAllergiesIngredientDto);
  }

  @Get('find-all-by-allergy/:idAllergy')
  @ApiOperation({ summary: 'Cerca tutte le allergie-ingrediente presenti basandosi sull\'ID dell\'allergia' })
  @ApiResponse({ status: 200, description: 'Allergie-ingrediente trovate con successo.', type: ResultAllergiesIngredientDto })
  @ApiParam({ name: 'idAllergy', type: 'number', description: 'ID allergia' })
  async findAllByAllergyId(@Param('idAllergy') idAllergy: string): Promise<ResultAllergiesIngredientDto> {
    const idAll = parseInt(idAllergy);
    return await this.allergiesIngredientsService.findAllByAllergyId(idAll);
  }

  @Get('find-all-by-ingredient/:idIngredient')
  @ApiOperation({ summary: 'Cerca tutte le allergie-ingrediente presenti basandosi sull\'ID dell\'ingrediente' })
  @ApiResponse({ status: 200, description: 'Allergie-ingrediente trovate con successo.', type: ResultAllergiesIngredientDto })
  @ApiParam({ name: 'idIngredient', type: 'number', description: 'ID ingrediente' })
  async findAllByIngredientId(@Param('idIngredient') idIngredient: string): Promise<ResultAllergiesIngredientDto> {
    const idIng = parseInt(idIngredient);
    return await this.allergiesIngredientsService.findAllByIngredientId(idIng);
  }

  @Get('find-one/:idAllergy/:idIngredient')
  @ApiOperation({ summary: 'Cerca una specifica allergia-ingrediente' })
  @ApiResponse({ status: 200, description: 'Allergia-ingrediente trovata con successo.', type: ResultAllergiesIngredientDto })
  @ApiParam({ name: 'idAllergy', type: 'number', description: 'ID allergia' })
  @ApiParam({ name: 'idIngredient', type: 'number', description: 'ID ingrediente' })
    async findOne(
    @Param('idAllergy') idAllergy: string,
    @Param('idIngredient') idIngredient: string,
    @Req() req)
    : Promise<ResultAllergiesIngredientDto> {
    const idAll = parseInt(idAllergy);
    const idIng = parseInt(idIngredient);
    return await this.allergiesIngredientsService.findOne(idAll, idIng);
  }


  @Delete(':idAllergy/:idIngredient')
  @ApiOperation({ summary: 'Rimuove una specifica allergia-ingrediente' })
  @ApiResponse({ status: 200, description: 'Allergia-ingrediente rimossa con successo.', type: ResultAllergiesIngredientDto })
  @ApiParam({ name: 'idAllergy', type: 'number', description: 'ID allergia' })
  @ApiParam({ name: 'idIngredient', type: 'number', description: 'ID ingrediente' })
  async remove(
    @Param('idAllergy') idAllergy: string,
    @Param('idIngredient') idIngredient: string,
    @Req() req)
    : Promise<ResultAllergiesIngredientDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const idAll = parseInt(idAllergy);
    const idIng = parseInt(idIngredient);
    return await this.allergiesIngredientsService.remove(idAll, idIng);
  }
}
