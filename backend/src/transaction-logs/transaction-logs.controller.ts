import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TransactionLogsService } from './transaction-logs.service';
import { CreateTransactionLogDto } from './dto/create-transaction-log.dto';
import { UpdateTransactionLogDto } from './dto/update-transaction-log.dto';
import { AuthorizationService } from 'src/authorization/authorization.service';
import { ResultTransactionLogDto } from './dto/result-transaction-log.dto';

@Controller('transaction-logs')
export class TransactionLogsController {
  constructor(
    private readonly transactionLogsService: TransactionLogsService,
    private readonly authorizationService: AuthorizationService

  ) {}

  @Post('create')
  async create(@Body() createTransactionLogDto: CreateTransactionLogDto, @Req() req): Promise<ResultTransactionLogDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    return await this.transactionLogsService.create(createTransactionLogDto);
  }

  @Get('find-all-by-bill/:id')
  async findAllByBillId(@Param('id') id: string, @Req() req): Promise<ResultTransactionLogDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const billId = parseInt(id)
    return await this.transactionLogsService.findAllByBillId(billId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ResultTransactionLogDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const transactionId = parseInt(id)
    return await this.transactionLogsService.remove(transactionId);
  }
}
