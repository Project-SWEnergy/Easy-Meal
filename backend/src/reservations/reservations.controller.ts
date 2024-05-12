import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ResultReservationsDto } from './dto/result-reservations.dto';
import { UserType } from '../authentication/dto/user-data.dto';
import { AuthorizationService } from '../authorization/authorization.service';


@Controller('reservations')
export class ReservationsController {

  constructor(
    private reservationsService: ReservationsService,
    private readonly authorizationService: AuthorizationService
  ) { }


  @Post('create')
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
  async findAllByRestaurantId(@Req() req): Promise<ResultReservationsDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    return await this.reservationsService.findAllByRestaurantId(auth.token.id);
  }


  @Get('find-one/:id')
  async findOne(@Param('id') id: string, @Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const reservationId = parseInt(id);
    if (isNaN(reservationId))
      throw new BadRequestException("Invalid reservation ID")
    return await this.reservationsService.findOne(reservationId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto, @Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const reservationId = parseInt(id);
    if (isNaN(reservationId))
      throw new BadRequestException("Invalid reservation ID")
    const update = await this.reservationsService.update(reservationId, updateReservationDto);
    if (update.result && update.data.length > 0) {
      await this.reservationsService.sendNotificationUpdate(reservationId);
    }
    return update;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const reservationId = parseInt(id);
    if (isNaN(reservationId))
      throw new BadRequestException("Invalid reservation ID")
    return await this.reservationsService.remove(reservationId);
  }
  
}
