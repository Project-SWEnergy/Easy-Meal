import { Controller, Get, Post, Body, Patch, Param, Delete, Req, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserType } from '../authentication/dto/user-data.dto';
import { ResultBillDto } from './dto/result-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { BillState } from './entities/bill.entity';
import { TransactionLogsService } from '../transaction-logs/transaction-logs.service';
import { CreateTransactionLogDto } from '../transaction-logs/dto/create-transaction-log.dto';
import { TransactionState } from '../transaction-logs/entities/transaction-log.entity';
import { OrderedDishesService } from '../ordered-dishes/ordered-dishes.service';
import { ReservationsService } from '../reservations/reservations.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('bills')
export class BillsController {
  constructor(
    private readonly billsService: BillsService,
    private readonly transactionLogsService: TransactionLogsService,
    private readonly orderedDishesService: OrderedDishesService,
    private readonly authorizationService: AuthorizationService,
    private readonly reservationsService: ReservationsService
  ) { }


  @Post('create-proportional')
  @ApiOperation({ summary: 'Crea uno nuovo scontrino con pagamento proporzionale'})
  @ApiResponse({ status: 200, description: 'Scontrino proporzionale creato con successo.', type: ResultBillDto })
  @ApiBody({ type: CreateBillDto })
  async createProportional(@Body() createBillDto: CreateBillDto, @Req() req): Promise<ResultBillDto> {
    let billUpdateResult: any;
    try {
      const accessToken = req.cookies.accessToken;
      const auth = this.authorizationService.isAuthorized(accessToken);

      if (createBillDto.id_ordered_dishes === undefined)
        throw new BadRequestException("Id ordered dishes missing")

      const reservation = await this.reservationsService.findOne(createBillDto.id_reservation);
      
      createBillDto.bill_state = BillState.InCorso;
      const billCreateResult = await this.billsService.create(createBillDto);

      const transactionLog: CreateTransactionLogDto = {
        id_bill: billCreateResult.data[0].id,
        timestamp: new Date(Date.now()),
        transaction_state: TransactionState.Concluso,
        message: "Transazione effettuata correttamente"
      }
      const transactionLogResult = await this.transactionLogsService.create(transactionLog);

      createBillDto.bill_state = BillState.Concluso;
      billUpdateResult = await this.billsService.update(billCreateResult.data[0].id, createBillDto);

      let orderedDishesUpdateResult: any[] = [];
      let data: any;
      for (let index = 0; index < createBillDto.id_ordered_dishes.length; index++) {
        data = await this.orderedDishesService.update(createBillDto.id_ordered_dishes[index], {paid: true})
        orderedDishesUpdateResult.push(data);
      }
      const reservationUpdateResult = await this.reservationsService.update(createBillDto.id_reservation, { paid_orders: reservation.data[0].paid_orders + 1 });
      if (reservationUpdateResult.result && createBillDto.id_reservation !== undefined)
        this.billsService.sendNotificationUpdate(createBillDto.id_reservation, auth.token.id);
    }
    catch (error) {
      console.error(error); 
      throw new InternalServerErrorException(error.message);
    }
    return billUpdateResult;
  }


  @Post('create-equidivided')
  @ApiOperation({ summary: 'Crea uno nuovo scontrino con pagamento equidiviso'})
  @ApiResponse({ status: 200, description: 'Scontrino equidiviso creato con successo.', type: ResultBillDto })
  @ApiBody({ type: CreateBillDto })
  async createEquidivided(@Body() createBillDto: CreateBillDto, @Req() req): Promise<ResultBillDto> {
    let billUpdateResult: any;
    try {
      const accessToken = req.cookies.accessToken;
      const auth = this.authorizationService.isAuthorized(accessToken);

      const reservation = await this.reservationsService.findOne(createBillDto.id_reservation);
      
      createBillDto.bill_state = BillState.InCorso;
      const billCreateResult = await this.billsService.create(createBillDto);

      const transactionLog: CreateTransactionLogDto = {
        id_bill: billCreateResult.data[0].id,
        timestamp: new Date(Date.now()),
        transaction_state: TransactionState.Concluso,
        message: "Transazione effettuata correttamente"
      }
      const transactionLogResult = await this.transactionLogsService.create(transactionLog);

      createBillDto.bill_state = BillState.Concluso;
      billUpdateResult = await this.billsService.update(billCreateResult.data[0].id, createBillDto);

      const reservationUpdateResult = await this.reservationsService.update(createBillDto.id_reservation, { paid_orders: reservation.data[0].paid_orders + 1 });
      if (reservationUpdateResult.result && createBillDto.id_reservation !== undefined)
        this.billsService.sendNotificationUpdate(createBillDto.id_reservation, auth.token.id);
    }
    catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
    return billUpdateResult;
  }


  
  @Get('find-all-by-reservation/:reservationId')
  @ApiOperation({ summary: 'Cerca tutti gli scontrini relativi ad una specifica prenotazione'})
  @ApiResponse({ status: 200, description: 'Scontrini trovati con successo.', type: ResultBillDto })
  @ApiParam({ name: 'reservationId', type: 'number', description: 'ID prenotazione' })
  async findAllByReservationId(@Param('reservationId') reservationId: string, @Req() req): Promise<ResultBillDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const resId = parseInt(reservationId)
    return await this.billsService.findAllByReservationId(resId);
  }


  @Get('find-one/:id')
  @ApiOperation({ summary: 'Cerca uno specifico scontrino basandosi sul suo ID'})
  @ApiResponse({ status: 200, description: 'Scontrino trovato con successo.', type: ResultBillDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID scontrino' })
  async findOne(@Param('id') id: string, @Req() req): Promise<ResultBillDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const billId = parseInt(id);
    return await this.billsService.findOne(billId);
  }

  @Get('did-user-paid-once/:idUser/:idRestaurant')
  @ApiOperation({ summary: 'Verifica se un utente ha già pagato almeno una volta in un ristorante'})
  @ApiResponse({ status: 200, description: 'Verifica effettuata con successo.', type: ResultBillDto })
  @ApiParam({ name: 'idUser', type: 'string', description: 'ID utente' })
  @ApiParam({ name: 'idRestaurant', type: 'string', description: 'ID ristorante' })
  async didUserPaidOnce(@Param('idUser') idUser: string, @Param('idRestaurant') idRestaurant: string, @Req() req): Promise<ResultBillDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const idUse = parseInt(idUser);
    const idRes = parseInt(idRestaurant);
    return await this.billsService.didUserPaidOnce(idUse, idRes);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifica uno specifico scontrino basandosi sul suo ID'})
  @ApiResponse({ status: 200, description: 'Scontrino modificato con successo.', type: ResultBillDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID scontrino' })
  @ApiBody({ type: UpdateBillDto })
  async update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto, @Req() req) { 
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const billId = parseInt(id);
    return await this.billsService.update(billId, updateBillDto);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Rimuove uno specifico scontrino basandosi sul suo ID'})
  @ApiResponse({ status: 200, description: 'Scontrino rimosso con successo.', type: ResultBillDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID scontrino' })
  async remove(@Param('id') id: string, @Req() req): Promise<ResultBillDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const billId = parseInt(id);
    return await this.billsService.remove(billId);
  }
  
}
