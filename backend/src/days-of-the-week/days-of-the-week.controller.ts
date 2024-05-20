import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DaysOfTheWeekService } from './days-of-the-week.service';
import { CreateDaysOfTheWeekDto } from './dto/create-days-of-the-week.dto';
import { UpdateDaysOfTheWeekDto } from './dto/update-days-of-the-week.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('days-of-the-week')
export class DaysOfTheWeekController {
  constructor(private readonly daysOfTheWeekService: DaysOfTheWeekService) {}

  /*@Post()
  create(@Body() createDaysOfTheWeekDto: CreateDaysOfTheWeekDto) {
    return this.daysOfTheWeekService.create(createDaysOfTheWeekDto);
  }

  @Get()
  findAll() {
    return this.daysOfTheWeekService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.daysOfTheWeekService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDaysOfTheWeekDto: UpdateDaysOfTheWeekDto) {
    return this.daysOfTheWeekService.update(+id, updateDaysOfTheWeekDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.daysOfTheWeekService.remove(+id);
  }*/

  @Get('get-one-from-id/:id')
  @ApiOperation({ summary: 'Restituisce il nome del giorno della settimana basandosi sul suo ID' })
  @ApiResponse({ status: 200, description: 'Nome del giorno della settimana trovato con successo.' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID giorno della settimana' })
  async getOneFromId(@Param('id') id: string) {
    const idDay = parseInt(id);
    return await this.daysOfTheWeekService.getNameFromId(idDay);
  }

  @Get('find-all')
  @ApiOperation({ summary: 'Restituisce tutti i giorni della settimana' })
  @ApiResponse({ status: 200, description: 'Giorni della settimana trovati con successo.' })
  async findAll() {
    return await this.daysOfTheWeekService.findAll();
  }
}
