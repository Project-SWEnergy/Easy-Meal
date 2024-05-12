import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { ResultAddressDto } from './dto/result-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly authorizationService: AuthorizationService
  ) { }

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<ResultAddressDto> {
    return await this.addressesService.create(createAddressDto);
  }

  @Get()
  async findOne(@Req() req): Promise<ResultAddressDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    return await this.addressesService.findOne(auth.token.id);
  }

  @Get('find-by-restaurantId/:id')
  async findByRestaurantId(@Param('id') id: string): Promise<ResultAddressDto> {
    const tagId = parseInt(id);
    return await this.addressesService.findByRestaurantId(tagId);
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateAddressDto, @Req() req): Promise<ResultAddressDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    return await this.addressesService.update(updateUserDto, auth.token.id);
  }

  @Delete()
  async remove(@Req() req): Promise<ResultAddressDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    return await this.addressesService.remove(auth.token.id);
  }
}
