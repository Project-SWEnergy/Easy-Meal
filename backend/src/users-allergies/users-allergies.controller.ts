import { Controller, Get, Post, Body, BadRequestException, Param, Patch, Req } from '@nestjs/common';
import { UsersAllergiesService } from './users-allergies.service';
import { CreateUsersAllergyDto } from './dto/create-users-allergy.dto';
import { ResultUserAllergiesDto } from './dto/result-users-allergy.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { Request } from 'express';
import { UserType } from '../authentication/dto/user-data.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';


@Controller('users-allergies')
export class UsersAllergiesController {

  constructor(
    private readonly usersAllergiesService: UsersAllergiesService,
    private readonly authorizationService: AuthorizationService
  ) { }

  @Post('create')
  @ApiOperation({ summary: 'Crea una nuova allergia per l\'utente' })
  @ApiResponse({ status: 200, description: 'Allergia creata con successo.', type: ResultUserAllergiesDto })
  @ApiBody({ type: CreateUsersAllergyDto })
  async create(@Body() createUsersAllergyDto: CreateUsersAllergyDto, @Req() req: Request): Promise<ResultUserAllergiesDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    return await this.usersAllergiesService.create(createUsersAllergyDto, auth.token.id);
  }

  @Get()
  @ApiOperation({ summary: 'Cerca tutte le allergie associate all\'utente' })
  @ApiResponse({ status: 200, description: 'Allergie trovate con successo.', type: ResultUserAllergiesDto })
  async findAllByUser(@Req() req: Request): Promise<ResultUserAllergiesDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    return await this.usersAllergiesService.findAllByUser(auth.token.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Cerca una specifica allergia associata all\'utente' })
  @ApiResponse({ status: 200, description: 'Allergia trovata con successo.', type: ResultUserAllergiesDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID allergia' })
  async findOneByUser(@Param('id') id: string, @Req() req: Request): Promise<ResultUserAllergiesDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    const allergyId = parseInt(id);
    if (!Number.isInteger(allergyId))
      throw new BadRequestException("Invalid allergy ID");
    return await this.usersAllergiesService.findOneByUser(allergyId, auth.token.id);

  }

  @Patch()
  @ApiOperation({ summary: 'Modifica una specifica allergia associata all\'utente' })
  @ApiResponse({ status: 200, description: 'Allergia modificata con successo.', type: ResultUserAllergiesDto })
  @ApiBody({ type: CreateUsersAllergyDto })
  async update(@Body() updateUsersAllergyDto: CreateUsersAllergyDto, @Req() req: Request): Promise<ResultUserAllergiesDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    return await this.usersAllergiesService.update(auth.token.id, updateUsersAllergyDto);
  }

}
