import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ResultReservationsDto } from './dto/result-reservations.dto';
import { UserType } from '../authentication/dto/user-data.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';


@Controller('reservations')
export class ReservationsController {

  constructor(
    private reservationsService: ReservationsService,
    private readonly authorizationService: AuthorizationService
  ) { }


  @Post('create')
  @ApiOperation({ summary: 'Crea una nuova prenotazione'})
  @ApiResponse({ status: 200, description: 'Prenotazione creata con successo.', type: ResultReservationsDto })
  @ApiBody({ type: CreateReservationDto })
  async create(@Body() createReservationDto: CreateReservationDto, @Req() req): Promise<ResultReservationsDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    const create = await this.reservationsService.create(createReservationDto);
    if (create.result && create.data.length > 0 && create.data[0].id !== undefined) {
      await this.reservationsService.sendNotificationCreate(create.data[0].id);
    } 
    return create;
  }

  @Get('find-all')
  @ApiOperation({ summary: 'Cerca tutte le prenotazioni associate ad un ID ristorante'})
  @ApiResponse({ status: 200, description: 'Prenotazioni trovate con successo.', type: ResultReservationsDto })
  async findAllByRestaurantId(@Req() req): Promise<ResultReservationsDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    return await this.reservationsService.findAllByRestaurantId(auth.token.id);
  }


  @Get('find-one/:id')
  @ApiOperation({ summary: 'Cerca una specifica prenotazione'})
  @ApiResponse({ status: 200, description: 'Prenotazione trovata con successo.', type: ResultReservationsDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID prenotazione' })
  async findOne(@Param('id') id: string, @Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const reservationId = parseInt(id);
    return await this.reservationsService.findOne(reservationId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifica una specifica prenotazione basandosi sul suo ID'})
  @ApiResponse({ status: 200, description: 'Prenotazione modificata con successo.', type: ResultReservationsDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID prenotazione' })
  @ApiBody({ type: UpdateReservationDto })
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto, @Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const reservationId = parseInt(id);
    const update = await this.reservationsService.update(reservationId, updateReservationDto);
    if (update.result && update.data.length > 0) {
      await this.reservationsService.sendNotificationUpdate(reservationId);
    }
    return update;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Rimuove una specifica prenotazione basandosi su ID ristorante ed ID utente'})
  @ApiResponse({ status: 200, description: 'Prenotazione rimossa con successo.', type: ResultReservationsDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID prenotazione' })
  async remove(@Param('id') id: string, @Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const reservationId = parseInt(id);
    return await this.reservationsService.remove(reservationId);
  }
  
}
