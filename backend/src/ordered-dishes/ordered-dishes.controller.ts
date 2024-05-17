import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException } from '@nestjs/common';
import { OrderedDishesService } from './ordered-dishes.service';
import { CreateOrderedDishDto } from './dto/create-ordered-dish.dto';
import { UpdateOrderedDishDto } from './dto/update-ordered-dish.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { ResultOrderedDishDto } from './dto/result-ordered-dish.dto';
import { UserType } from '../authentication/dto/user-data.dto';
import { removed_ingredients } from '../../db/schema';
import { ReservationsService } from '../reservations/reservations.service';
import { ReservationState } from '../reservations/entities/reservation.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('ordered-dishes')
export class OrderedDishesController {
  constructor(
    private readonly orderedDishesService: OrderedDishesService,
    private readonly authorizationService: AuthorizationService,
    private readonly reservationService: ReservationsService
  ) { }

  @Post('create')
  @ApiOperation({ summary: 'Crea un nuovo ordine' })
  @ApiResponse({ status: 200, description: 'Ordine creato con successo.', type: ResultOrderedDishDto })
  @ApiBody({ type: CreateOrderedDishDto, isArray: true })
  async create(@Body() createOrderedDishDto: CreateOrderedDishDto[], @Req() req): Promise<ResultOrderedDishDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    if (createOrderedDishDto.length <= 0)
      throw new BadRequestException("No data provided");
    const reservation = await this.reservationService.findOne(createOrderedDishDto[0].id_reservation)
    if (reservation.data[0].reservation_state === ReservationState.Rifiutata ||
      reservation.data[0].reservation_state === ReservationState.Annullata ||
      reservation.data[0].reservation_state === ReservationState.Concluso ||
      reservation.data[0].reservation_state === ReservationState.Pagamento
    )
      throw new BadRequestException("Invalid reservation state")
    let removedDishes: any;
    try {
      for (let i = 0; i < createOrderedDishDto.length; i++) {
        createOrderedDishDto[i].id_user = auth.token.id;
        createOrderedDishDto[i].paid = false;
      }
      removedDishes = await this.orderedDishesService.remove(auth.token.id, createOrderedDishDto[0].id_reservation);
    }
    catch (error) {
      console.error(error)
    }
    if (createOrderedDishDto[0].id_dish !== undefined) {
      const order = await this.orderedDishesService.create(createOrderedDishDto);
      if (order.result && order.data[0][0].id_reservation !== undefined)
        this.orderedDishesService.sendNotificationUpdate(order.data[0][0].id_reservation);
      return order;
    }
    else
      return removedDishes;
  }

  @Get('find-all-by-reservation/:id')
  @ApiOperation({ summary: 'Cerca tutti gli ordini associati ad un ID prenotazione' })
  @ApiResponse({ status: 200, description: 'Ordini trovati con successo.', type: ResultOrderedDishDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID prenotazione' })
  async findAllByReservationId(@Param('id') id: string, @Req() req): Promise<ResultOrderedDishDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const idReservation = parseInt(id);
    return await this.orderedDishesService.findAllByReservationId(idReservation);
  }

  @Get('find-all-by-user/:idUser/:idReservation')
  @ApiOperation({ summary: 'Cerca tutti gli ordini associati ad un ID utente e ID prenotazione' })
  @ApiResponse({ status: 200, description: 'Ordini trovati con successo.', type: ResultOrderedDishDto })
  @ApiParam({ name: 'idUser', type: 'number', description: 'ID utente' })
  @ApiParam({ name: 'idReservation', type: 'number', description: 'ID prenotazione' })
  async findAllByUserId(@Param('idUser') idUser: string, @Param('idReservation') idReservation: string, @Req() req): Promise<ResultOrderedDishDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const idUse = parseInt(idUser);
    const idRes = parseInt(idReservation);
    return await this.orderedDishesService.findAllByUserId(idUse, idRes);
  }

  @Get('find-all-unpaid/:idReservation')
  @ApiOperation({ summary: 'Cerca tutti gli ordini non pagati associati ad un ID prenotazione' })
  @ApiResponse({ status: 200, description: 'Ordini trovati con successo.', type: ResultOrderedDishDto })
  @ApiParam({ name: 'idReservation', type: 'number', description: 'ID prenotazione' })
  async findAllUnpaidOrders(@Param('idReservation') idReservation: string, @Req() req): Promise<ResultOrderedDishDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const idRes = parseInt(idReservation);
    return await this.orderedDishesService.findAllUnpaidOrders(idRes);
  }

  @Get('find-all-unpaid-by-user/:idUser/:idReservation')
  @ApiOperation({ summary: 'Cerca tutti gli ordini non pagati associati ad un ID utente e ID prenotazione' })
  @ApiResponse({ status: 200, description: 'Ordini trovati con successo.', type: ResultOrderedDishDto })
  @ApiParam({ name: 'idUser', type: 'number', description: 'ID utente' })
  @ApiParam({ name: 'idReservation', type: 'number', description: 'ID prenotazione' })
  async findAllUnpaidOrdersByUserId(@Param('idUser') idUser: string, @Param('idReservation') idReservation: string, @Req() req): Promise<ResultOrderedDishDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const idRes = parseInt(idReservation);
    const idUse = parseInt(idUser);
    return await this.orderedDishesService.findAllUnpaidOrdersByUserId(idUse, idRes);
  }

  @Get('find-one/:id')
  @ApiOperation({ summary: 'Cerca un ordine specifico' })
  @ApiResponse({ status: 200, description: 'Ordine trovato con successo.', type: ResultOrderedDishDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID ordine' })
  async findOne(@Param('id') id: string, @Req() req): Promise<ResultOrderedDishDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const idOrder = parseInt(id);
    return await this.orderedDishesService.findOne(idOrder);
  }

  @Get('reservation-total-bill/:idReservation')
  @ApiOperation({ summary: 'Calcola il totale della prenotazione' })
  @ApiResponse({ status: 200, description: 'Totale prenotazione calcolato con successo.', type: ResultOrderedDishDto })
  @ApiParam({ name: 'idReservation', type: 'number', description: 'ID prenotazione' })
  async reservationTotalBill(@Param('idReservation') idReservation: string, @Req() req): Promise<ResultOrderedDishDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const idRes = parseInt(idReservation);
    return await this.orderedDishesService.reservationTotalBill(idRes);
  }

  @Get('user-total-bill/:idUser/:idReservation')
  @ApiOperation({ summary: 'Calcola il totale dell\'utente per la prenotazione' })
  @ApiResponse({ status: 200, description: 'Totale utente calcolato con successo.', type: ResultOrderedDishDto })
  @ApiParam({ name: 'idUser', type: 'number', description: 'ID utente' })
  @ApiParam({ name: 'idReservation', type: 'number', description: 'ID prenotazione' })
  async userTotalBill(
    @Param('idUser') idUser: string,
    @Param('idReservation') idReservation: string,
    @Req() req
  ): Promise<ResultOrderedDishDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const idRes = parseInt(idReservation);
    const idUse = parseInt(idUser);
    return await this.orderedDishesService.userTotalBill(idUse, idRes);
  }


  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const orderId = parseInt(id)
    return await this.orderedDishesService.removeById(orderId);
  }
}
