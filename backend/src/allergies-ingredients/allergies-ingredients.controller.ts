import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AllergiesIngredientsService } from './allergies-ingredients.service';
import { CreateAllergiesIngredientDto } from './dto/create-allergies-ingredient.dto';
import { UpdateAllergiesIngredientDto } from './dto/update-allergies-ingredient.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserType } from '../authentication/dto/user-data.dto';
import { ResultAllergiesIngredientDto } from './dto/result-allergies-ingredient.dto';

@Controller('allergies-ingredients')
export class AllergiesIngredientsController {
  constructor(
    private readonly allergiesIngredientsService: AllergiesIngredientsService,
    private readonly authorizationService: AuthorizationService
  ) { }

  @Post('create')
  async create(
    @Body() createAllergiesIngredientDto: CreateAllergiesIngredientDto,
    @Req() req
  ): Promise<ResultAllergiesIngredientDto> {
      const accessToken = req.cookies.accessToken;
      const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
      return await this.allergiesIngredientsService.create(createAllergiesIngredientDto);
  }

  @Get('find-all-by-allergy/:idAllergy')
  async findAllByAllergyId(@Param('idAllergy') idAllergy: string): Promise<ResultAllergiesIngredientDto> {
    const idAll = parseInt(idAllergy);
    return await this.allergiesIngredientsService.findAllByAllergyId(idAll);
  }

  @Get('find-all-by-ingredient/:idIngredient')
  async findAllByIngredientId(@Param('idIngredient') idIngredient: string): Promise<ResultAllergiesIngredientDto> {
    const idIng = parseInt(idIngredient);
    return await this.allergiesIngredientsService.findAllByIngredientId(idIng);
  }

  @Get('find-one/:idAllergy/:idIngredient')
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
