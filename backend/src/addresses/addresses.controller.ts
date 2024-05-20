import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { ResultAddressDto } from './dto/result-address.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('addresses')
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly authorizationService: AuthorizationService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Crea un nuovo indirizzo' })
  @ApiResponse({ status: 200, description: 'Indirizzo creato con successo.', type: ResultAddressDto })
  @ApiBody({ type: CreateAddressDto })
  async create(@Body() createAddressDto: CreateAddressDto): Promise<ResultAddressDto> {
    return await this.addressesService.create(createAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Cerca l\'indirizzo dell\'utente' })
  @ApiResponse({ status: 200, description: 'Indirizzo trovato con successo.', type: ResultAddressDto })
  async findOne(@Req() req): Promise<ResultAddressDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    return await this.addressesService.findOne(auth.token.id);
  }

  @Get('find-by-restaurantId/:id')
  @ApiOperation({ summary: 'Cerca l\'indirizzo di un ristorante' })
  @ApiResponse({ status: 200, description: 'Indirizzo trovato con successo.', type: ResultAddressDto })
  @ApiParam({ name: 'id', type: 'number', description: 'ID ristorante' })
  async findByRestaurantId(@Param('id') id: string): Promise<ResultAddressDto> {
    const tagId = parseInt(id);
    return await this.addressesService.findByRestaurantId(tagId);
  }

  @Patch()
  @ApiOperation({ summary: 'Modifica l\'indirizzo dell\'utente' })
  @ApiResponse({ status: 200, description: 'Indirizzo modificato con successo.', type: ResultAddressDto })
  @ApiBody({ type: UpdateAddressDto })
  async update(@Body() updateUserDto: UpdateAddressDto, @Req() req): Promise<ResultAddressDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    return await this.addressesService.update(updateUserDto, auth.token.id);
  }

  @Delete()
  @ApiOperation({ summary: 'Rimuove l\'indirizzo dell\'utente' })
  @ApiResponse({ status: 200, description: 'Indirizzo rimosso con successo.', type: ResultAddressDto })
  async remove(@Req() req): Promise<ResultAddressDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    return await this.addressesService.remove(auth.token.id);
  }
}
