import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TagsService } from './tags.service';
//import { AuthorizationService } from 'src/authorization/authorization.service';
import { ResultTagDto } from './dto/result-tag.dto';
//import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {

  constructor(
    private readonly tagsService: TagsService,
    //private readonly authorizationService: AuthorizationService
  ) { }

  @Get('find-all')
  @ApiOperation({ summary: 'Cerca tutti i tag' })
  @ApiResponse({ status: 200, description: 'Tag trovati con successo.', type: ResultTagDto })
  async findAll(): Promise<ResultTagDto> {
    return await this.tagsService.findAll();
  }

  @Get('find-one/:id')
  @ApiOperation({ summary: 'Cerca un tag specifico basandosi sul suo ID' })
  @ApiResponse({ status: 200, description: 'Tag trovato con successo.', type: ResultTagDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID tag' })
  async findOne(@Param('id') id: string): Promise<ResultTagDto> {
    const tagId = parseInt(id);
    return await this.tagsService.findOne(tagId);
  }

  @Get('find-by-name/:name')
  @ApiOperation({ summary: 'Cerca un tag specifico basandosi sul suo nome' })
  @ApiResponse({ status: 200, description: 'Tag trovato con successo.', type: ResultTagDto })
  @ApiParam({ name: 'name', type: 'string', description: 'Nome tag' })
  async findByName(@Param('name') name: string): Promise<ResultTagDto> {
    return await this.tagsService.findByName(name);
  }
}
