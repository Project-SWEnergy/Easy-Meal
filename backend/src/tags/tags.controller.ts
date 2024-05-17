import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TagsService } from './tags.service';
//import { AuthorizationService } from 'src/authorization/authorization.service';
import { ResultTagDto } from './dto/result-tag.dto';
//import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TagsController {

  constructor(
    private readonly tagsService: TagsService,
    //private readonly authorizationService: AuthorizationService
  ) { }

  @Get('find-all')
  async findAll(): Promise<ResultTagDto> {
    return await this.tagsService.findAll();
  }

  @Get('find-one/:id')
  async findOne(@Param('id') id: string): Promise<ResultTagDto> {
    const tagId = parseInt(id);
    return await this.tagsService.findOne(tagId);
  }

  @Get('find-by-name/:name')
  async findByName(@Param('name') name: string): Promise<ResultTagDto> {
    return await this.tagsService.findByName(name);
  }
}
