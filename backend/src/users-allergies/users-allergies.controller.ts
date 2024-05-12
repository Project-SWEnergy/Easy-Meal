import { Controller, Get, Post, Body, BadRequestException, Param, Patch, Req } from '@nestjs/common';
import { UsersAllergiesService } from './users-allergies.service';
import { CreateUsersAllergyDto } from './dto/create-users-allergy.dto';
import { ResultUserAllergiesDto } from './dto/result-users-allergy.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { Request } from 'express';
import { UserType } from '../authentication/dto/user-data.dto';

@Controller('users-allergies')
export class UsersAllergiesController {

  constructor(
    private readonly usersAllergiesService: UsersAllergiesService,
    private readonly authorizationService: AuthorizationService
  ) { }

  @Post('create')
  async create(@Body() createUsersAllergyDto: CreateUsersAllergyDto, @Req() req: Request): Promise<ResultUserAllergiesDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    return await this.usersAllergiesService.create(createUsersAllergyDto, auth.token.id);
  }

  @Get()
  async findAllByUser(@Req() req: Request): Promise<ResultUserAllergiesDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    return await this.usersAllergiesService.findAllByUser(auth.token.id);
  }

  @Get(':id')
  async findOneByUser(@Param('id') id: string, @Req() req: Request): Promise<ResultUserAllergiesDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    const allergyId = parseInt(id);
    if (!Number.isInteger(allergyId))
      throw new BadRequestException("Invalid allergy ID");
    return await this.usersAllergiesService.findOneByUser(allergyId, auth.token.id);

  }

  @Patch()
  async update(@Body() updateUsersAllergyDto: CreateUsersAllergyDto, @Req() req: Request): Promise<ResultUserAllergiesDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    return await this.usersAllergiesService.update(auth.token.id, updateUsersAllergyDto);
  }

}
