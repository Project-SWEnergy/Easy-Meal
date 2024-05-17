import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TransactionLogsService } from './transaction-logs.service';
import { CreateTransactionLogDto } from './dto/create-transaction-log.dto';
import { UpdateTransactionLogDto } from './dto/update-transaction-log.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { ResultTransactionLogDto } from './dto/result-transaction-log.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';


@Controller('transaction-logs')
export class TransactionLogsController {
  constructor(
    private readonly transactionLogsService: TransactionLogsService,
    private readonly authorizationService: AuthorizationService

  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Crea un nuovo log di transazione'})
  @ApiResponse({ status: 200, description: 'Log di transazione creato con successo.', type: ResultTransactionLogDto })
  @ApiBody({ type: CreateTransactionLogDto })
  async create(@Body() createTransactionLogDto: CreateTransactionLogDto, @Req() req): Promise<ResultTransactionLogDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    return await this.transactionLogsService.create(createTransactionLogDto);
  }

  @Get('find-all-by-bill/:id')
  @ApiOperation({ summary: 'Cerca tutti i log di transazione associati ad un ID fattura'})
  @ApiResponse({ status: 200, description: 'Log di transazione trovati con successo.', type: ResultTransactionLogDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID fattura' })
  async findAllByBillId(@Param('id') id: string, @Req() req): Promise<ResultTransactionLogDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const billId = parseInt(id)
    return await this.transactionLogsService.findAllByBillId(billId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Rimuovi un log di transazione specifico basandosi sul suo ID'})
  @ApiResponse({ status: 200, description: 'Log di transazione rimosso con successo.', type: ResultTransactionLogDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID log di transazione' })
  async remove(@Param('id') id: string, @Req() req): Promise<ResultTransactionLogDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const transactionId = parseInt(id)
    return await this.transactionLogsService.remove(transactionId);
  }
}
