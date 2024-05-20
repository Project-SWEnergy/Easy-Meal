import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, Req } from '@nestjs/common';
import { OpeningHoursService } from './opening-hours.service';
import { CreateOpeningHoursDto } from './dto/create-opening-hours.dto';
import { UpdateOpeningHoursDto } from './dto/update-opening-hours.dto';
import { format, parse } from 'date-fns';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserType } from '../authentication/dto/user-data.dto';
import * as moment from 'moment';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('opening-hours')
export class OpeningHoursController {
  constructor(
    private readonly openingHoursService: OpeningHoursService,
    private readonly authorizationService: AuthorizationService
  ) { }

  @Post('create')
  @ApiOperation({ summary: 'Crea un nuovo orario di apertura.' })
  @ApiResponse({ status: 200, description: 'Orario di apertura creato con successo.' })
  @ApiBody({ type: CreateOpeningHoursDto })
  async create(@Body() createOpeningHourDto: CreateOpeningHoursDto[], @Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    for (let index = 0; index < createOpeningHourDto.length; index++) {
      createOpeningHourDto[index].id_restaurant = auth.token.id;
    }
    return await this.openingHoursService.create(createOpeningHourDto);
  }

  @Get('find-all-by-restaurant/:idRestaurant')
  @ApiOperation({ summary: 'Cerca tutti gli orari di apertura associati ad un ID ristorante.' })
  @ApiResponse({ status: 200, description: 'Orari di apertura trovati con successo.' })
  @ApiParam({ name: 'idRestaurant', type: 'number', description: 'ID ristorante' })
  async findAllByRestaurantId(@Param('idRestaurant') idRestaurant: string) {
    const idRest = parseInt(idRestaurant);
    return await this.openingHoursService.findAllByRestaurantId(idRest);
  }

  @Get('find-one/:idOpeningHour')
  @ApiOperation({ summary: 'Cerca un orario di apertura specifico.' })
  @ApiResponse({ status: 200, description: 'Orario di apertura trovato con successo.' })
  @ApiParam({ name: 'idOpeningHour', type: 'number', description: 'ID orario di apertura' })
  async findOne(@Param('idOpeningHour') idOpeningHour: string) {
    const id = parseInt(idOpeningHour);
    return await this.openingHoursService.findOne(id);
  }

  @Patch(':idOpeningHour')
  @ApiOperation({ summary: 'Modifica un orario di apertura specifico.' })
  @ApiResponse({ status: 200, description: 'Orario di apertura modificato con successo.' })
  @ApiParam({ name: 'idOpeningHour', type: 'number', description: 'ID orario di apertura' })
  @ApiBody({ type: UpdateOpeningHoursDto })
  update(@Param('idOpeningHour') idOpeningHour: string, @Body() updateOpeningHourDto: UpdateOpeningHoursDto, @Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    updateOpeningHourDto.id_restaurant = auth.token.id;
    const id = parseInt(idOpeningHour);
    return this.openingHoursService.update(id, updateOpeningHourDto);
  }

  @Delete(':idOpeningHour')
  @ApiOperation({ summary: 'Rimuovi un orario di apertura specifico.' })
  @ApiResponse({ status: 200, description: 'Orario di apertura rimosso con successo.' })
  @ApiParam({ name: 'idOpeningHour', type: 'number', description: 'ID orario di apertura' })
  remove(@Param('idOpeningHour') idOpeningHour: string, @Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const id = parseInt(idOpeningHour);
    return this.openingHoursService.remove(id);
  }

}
