import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UsersReservationsService } from './users-reservations.service';
import { CreateUsersReservationDto } from './dto/create-users-reservation.dto';
import { UpdateUsersReservationDto } from './dto/update-users-reservation.dto';
import { ResultUsersReservationDto } from './dto/result-users-reservation.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserType } from '../authentication/dto/user-data.dto';
import { InviteUsersReservationDto } from './dto/invite-users-reservation.dto';
import { ReservationsService } from '../reservations/reservations.service';
import { UpdateReservationDto } from '../reservations/dto/update-reservation.dto';
import { ReservationState } from '../reservations/entities/reservation.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';


@Controller('users-reservations')
export class UsersReservationsController {
  constructor(
    private readonly usersReservationsService: UsersReservationsService,
    private readonly authorizationService: AuthorizationService,
    private reservationsService: ReservationsService
  ) { }

  @Post('create')
  @ApiOperation({ summary: 'Crea una nuova prenotazione'})
  @ApiResponse({ status: 200, description: 'Prenotazione creata con successo.', type: ResultUsersReservationDto })
  @ApiBody({ type: CreateUsersReservationDto })
  async create(@Body() createUsersReservationDto: CreateUsersReservationDto, @Req() req): Promise<ResultUsersReservationDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    createUsersReservationDto.id_user = parseInt(auth.token.id);
    createUsersReservationDto.accepted = true;
    return await this.usersReservationsService.create(createUsersReservationDto);
  }

  @Post('invite')
  @ApiOperation({ summary: 'Invita un utente ad una prenotazione'})
  @ApiResponse({ status: 200, description: 'Invito inviato con successo.', type: ResultUsersReservationDto })
  @ApiBody({ type: InviteUsersReservationDto })
  async invite(@Body() inviteUsersDto: InviteUsersReservationDto, @Req() req): Promise<ResultUsersReservationDto> {
    let invite: any;
    try {
      const accessToken = req.cookies.accessToken;
      const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
      invite = await this.usersReservationsService.invite(inviteUsersDto);
    }
    catch (error) {
      console.error(error);
    }
    return invite
  }


  @Get('find-all-by-user')
  @ApiOperation({ summary: 'Cerca tutte le prenotazioni associate ad un ID utente'})
  @ApiResponse({ status: 200, description: 'Prenotazioni trovate con successo.', type: ResultUsersReservationDto })
  async findAllByUserId(@Req() req): Promise<ResultUsersReservationDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    const userId = parseInt(auth.token.id);
    return await this.usersReservationsService.findAllByUserId(userId);
  }

  @Get('find-all-by-reservation/:idReservation')
  @ApiOperation({ summary: 'Cerca tutte le prenotazioni associate ad un ID prenotazione'})
  @ApiResponse({ status: 200, description: 'Prenotazioni trovate con successo.', type: ResultUsersReservationDto })
  @ApiParam({ name: 'idReservation', type: 'number', description: 'ID prenotazione' })
  async findAllByReservationId(@Param('idReservation') idReservation: string, @Req() req): Promise<ResultUsersReservationDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const idRes = parseInt(idReservation);
    return await this.usersReservationsService.findAllByReservationId(idRes);
  }

  @Get('find-one/:idUser/:idReservation')
  @ApiOperation({ summary: 'Cerca una specifica prenotazione'})
  @ApiResponse({ status: 200, description: 'Prenotazione trovata con successo.', type: ResultUsersReservationDto })
  @ApiParam({ name: 'idUser', type: 'number', description: 'ID utente' })
  @ApiParam({ name: 'idReservation', type: 'number', description: 'ID prenotazione' })
  async findOne(@Param('idUser') idUser: string, @Param('idReservation') idReservation: string, @Req() req): Promise<ResultUsersReservationDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const idRes = parseInt(idReservation);
    const idUse = parseInt(idUser);
    return await this.usersReservationsService.findOne(idUse, idRes);
  }

  @Patch(':idReservation')
  @ApiOperation({ summary: 'Modifica una specifica prenotazione basandosi sul suo ID'})
  @ApiResponse({ status: 200, description: 'Prenotazione modificata con successo.', type: ResultUsersReservationDto })
  @ApiParam({ name: 'idReservation', type: 'number', description: 'ID prenotazione' })
  @ApiBody({ type: UpdateUsersReservationDto })
  async update(@Body() updateUsersReservationDto: UpdateUsersReservationDto, @Param('idReservation') idReservation: string, @Req() req): Promise<ResultUsersReservationDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    const idRes = parseInt(idReservation);
    const idUse = parseInt(auth.token.id);
    return await this.usersReservationsService.update(updateUsersReservationDto, idUse, idRes);
  }

  @Delete(':idReservation')
  @ApiOperation({ summary: 'Rimuove una specifica prenotazione basandosi su ID prenotazione ed ID utente'})
  @ApiResponse({ status: 200, description: 'Prenotazione rimossa con successo.', type: ResultUsersReservationDto })
  @ApiParam({ name: 'idReservation', type: 'number', description: 'ID prenotazione' })
  async remove(@Param('idReservation') idReservation: string, @Req() req): Promise<ResultUsersReservationDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    const idRes = parseInt(idReservation);
    const idUse = parseInt(auth.token.id);
    const reservation = await this.usersReservationsService.findOne(auth.token.id, idRes)
    const removed = await this.usersReservationsService.remove(idUse, idRes);
    let reservationDto: UpdateReservationDto;
    if (reservation.result && reservation.data[0].partecipants > 1) {
      reservationDto = {
        partecipants: reservation.data[0].partecipants - 1,
      }
    }
    else if (reservation.result) {
      reservationDto = {
        reservation_state: ReservationState.Annullata
      }
    }
    this.reservationsService.update(idRes, reservationDto)
    const title = "Prenotazione aggiornata";
    const message = "La tua prenotazione numero " + idReservation + " è stata aggiornata."
    this.usersReservationsService.sendNotification(idUse, title, message, UserType.restaurant)
    return removed;
  }
}


