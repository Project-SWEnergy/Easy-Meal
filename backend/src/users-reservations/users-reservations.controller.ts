import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UsersReservationsService } from './users-reservations.service';
import { CreateUsersReservationDto } from './dto/create-users-reservation.dto';
import { UpdateUsersReservationDto } from './dto/update-users-reservation.dto';
import { ResultUsersReservationDto } from './dto/result-users-reservation.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserType } from '../authentication/dto/user-data.dto';
import { InviteUsersReservationDto } from './dto/invite-users-reservation.dto';

@Controller('users-reservations')
export class UsersReservationsController {
  constructor(
    private readonly usersReservationsService: UsersReservationsService,
    private readonly authorizationService: AuthorizationService
  ) { }

  @Post('create')
  async create(@Body() createUsersReservationDto: CreateUsersReservationDto, @Req() req): Promise<ResultUsersReservationDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    createUsersReservationDto.id_user = parseInt(auth.token.id);
    createUsersReservationDto.accepted = true;
    return await this.usersReservationsService.create(createUsersReservationDto);
  }
  
  @Post('invite')
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
  async findAllByUserId(@Req() req): Promise<ResultUsersReservationDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    const userId = parseInt(auth.token.id);
    return await this.usersReservationsService.findAllByUserId(userId);
  }

  @Get('find-all-by-reservation/:idReservation')
  async findAllByReservationId(@Param('idReservation') idReservation: string, @Req() req): Promise<ResultUsersReservationDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const idRes = parseInt(idReservation);
    return await this.usersReservationsService.findAllByReservationId(idRes);
  }

  @Get('find-one/:idUser/:idReservation')
  async findOne(@Param('idUser') idUser: string, @Param('idReservation') idReservation: string, @Req() req): Promise<ResultUsersReservationDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const idRes = parseInt(idReservation);
    const idUse = parseInt(idUser);
    return await this.usersReservationsService.findOne(idUse, idRes);
  }

  @Patch(':idReservation')
  async update(@Body() updateUsersReservationDto: UpdateUsersReservationDto, @Param('idReservation') idReservation: string, @Req() req): Promise<ResultUsersReservationDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    const idRes = parseInt(idReservation);
    const idUse = parseInt(auth.token.id);
    return await this.usersReservationsService.update(updateUsersReservationDto, idUse, idRes);
  }

  @Delete(':idReservation')
  async remove(@Param('idReservation') idReservation: string, @Req() req): Promise<ResultUsersReservationDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    const idRes = parseInt(idReservation);
    const idUse = parseInt(auth.token.id);
    return await this.usersReservationsService.remove(idUse, idRes);
  }
}
