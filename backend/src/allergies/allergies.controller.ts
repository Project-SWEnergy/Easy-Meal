import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AllergiesService } from './allergies.service';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';
import { ResultAllergyDto } from './dto/result-allergy.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';


@Controller('allergies')
export class AllergiesController {
  constructor(private readonly allergiesService: AllergiesService) {}

  @Post('create')
  @ApiOperation({ summary: 'Crea una nuova allergia'})
  @ApiResponse({ status: 200, description: 'Allergia creata con successo.', type: ResultAllergyDto })
  @ApiBody({ type: CreateAllergyDto })
  async create(@Body() createAllergyDto: CreateAllergyDto): Promise<ResultAllergyDto> {
    return await this.allergiesService.create(createAllergyDto);
  }

  @Get('find-all')
  @ApiOperation({ summary: 'Cerca tutte le allergie presenti'})
  @ApiResponse({ status: 200, description: 'Allergie trovate con successo.', type: ResultAllergyDto })
  async findAll(): Promise<ResultAllergyDto>{
    return this.allergiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Cerca una specifica allergia basandosi sul suo ID'})
  @ApiResponse({ status: 200, description: 'Allergia trovata con successo.', type: ResultAllergyDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID allergia' })
  async findOne(@Param('id') id: string): Promise<ResultAllergyDto>{
    return this.allergiesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifica una specifica allergia basandosi sul suo ID'})
  @ApiResponse({ status: 200, description: 'Allergia modificata con successo.', type: ResultAllergyDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID allergia' })
  @ApiBody({ type: UpdateAllergyDto })
  async update(@Param('id') id: string, @Body() updateAllergyDto: UpdateAllergyDto): Promise<ResultAllergyDto>{
    return this.allergiesService.update(+id, updateAllergyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Rimuove una specifica allergia basandosi sul suo ID'})
  @ApiResponse({ status: 200, description: 'Allergia rimossa con successo.', type: ResultAllergyDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID allergia' })
  async remove(@Param('id') id: string) : Promise<ResultAllergyDto>{
    return this.allergiesService.remove(+id)
  }
}
