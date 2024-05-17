import { Controller, Get, Post, Body, Patch, Param, Delete, Res, InternalServerErrorException, UseInterceptors, UploadedFiles, Req } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserType } from '../authentication/dto/user-data.dto';
import { AuthenticationService } from '../authentication/authentication.service';
import { Response } from 'express'; // Import for req and res types
import { CreateRestaurantAddressDto } from './dto/create-restaurant-address.dto';
import { AddressesService } from '../addresses/addresses.service';
import { UpdateRestaurantAddressDto } from './dto/update-restaurant-address.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadFileService } from '../upload-file/upload-file.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';




@Controller('restaurants')
export class RestaurantsController {

  constructor(
    private restaurantsService: RestaurantsService,
    private addressesService: AddressesService,
    private authorizationService: AuthorizationService,
    private authenticationService: AuthenticationService,
    private uploadFileService: UploadFileService
  ) { }

  @Post('create')
  @ApiOperation({ summary: 'Crea un nuovo ristorante.' })
  @ApiResponse({ status: 200, description: 'Ristorante creato con successo.' })
  @ApiBody({ type: CreateRestaurantAddressDto })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'logo', maxCount: 1 },
    { name: 'banner_image', maxCount: 1 },
  ]))
  async create(
    @Body() createRestaurantAddressDto: CreateRestaurantAddressDto,
    @Res() res: Response,
    @UploadedFiles() files: { logo?: Express.Multer.File[], banner_image?: Express.Multer.File[] }
  ): Promise<any> {
    try {
      const createdAddress = await this.addressesService.create(createRestaurantAddressDto.createAddressDto);
      createRestaurantAddressDto.createRestaurantDto.id_address = createdAddress.data[0].id;
      const result = await this.restaurantsService.create(createRestaurantAddressDto.createRestaurantDto);
      if (!result.result)
        throw new InternalServerErrorException("Creation failed")

      let logo = null;
      let banner_image = null;
      if (files.logo !== undefined)
        logo = this.uploadFileService.uploadImage(files.logo[0], result.data[0].id, UserType.restaurant);
      if (files.banner_image !== undefined)
        banner_image = this.uploadFileService.uploadImage(files.banner_image[0], result.data[0].id, UserType.restaurant);

      const updateRestaurantDto = {
        logo: logo,
        banner_image: banner_image
      }
      await this.restaurantsService.update(result.data[0].id, updateRestaurantDto);
      const authenticationDto = {
        email: result.data[0].email,
        password: result.data[0].password
      }
      const restaurantData = await this.authenticationService.signinRestaurant(authenticationDto);
      if (!restaurantData.result)
        throw new InternalServerErrorException("Authentication failed");
      delete result.data[0].password
      const accessToken = await this.authenticationService.generateAccessToken(restaurantData.user);
      try {
        res.cookie('accessToken', accessToken, { httpOnly: true });
      }
      catch (error) {
        console.log(error)
        throw new InternalServerErrorException("Unexpected error");
      }
      delete result.data[0].password
      return res.status(200).json(result);
    }
    catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Unexpected error");
    }
  }

  @Get('find-all')
  @ApiOperation({ summary: 'Cerca tutti i ristoranti.' })
  @ApiResponse({ status: 200, description: 'Ristoranti trovati con successo.' })
  async findAll() {
    return await this.restaurantsService.findAll();
  }

  @Get('find-all-by-city/:cityName')
  @ApiOperation({ summary: 'Cerca tutti i ristoranti di una specifica città.' })
  @ApiResponse({ status: 200, description: 'Ristoranti trovati con successo.' })
  @ApiParam({ name: 'cityName', type: 'string', description: 'Nome della città' })
  async findAllByCity(@Param('cityName') cityName: string) {
    return await this.restaurantsService.findAllByCity(cityName);
  }

  @Get('find-one/:id')
  @ApiOperation({ summary: 'Cerca un ristorante specifico basandosi sul suo ID.' })
  @ApiResponse({ status: 200, description: 'Ristorante trovato con successo.' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID ristorante' })
  async findOne(@Param('id') id: string) {
    const idRestaurant = parseInt(id);
    return await this.restaurantsService.findOne(idRestaurant);
  }

  @Patch()
  @ApiOperation({ summary: 'Modifica un ristorante specifico.' })
  @ApiResponse({ status: 200, description: 'Ristorante modificato con successo.' })
  @ApiBody({ type: UpdateRestaurantAddressDto })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'logo', maxCount: 1 },
    { name: 'banner_image', maxCount: 1 },
  ]))
  async update(
    @Body() updateRestaurantAddressDto: UpdateRestaurantAddressDto,
    @Req() req,
    @UploadedFiles() files: { logo?: Express.Multer.File[], banner_image?: Express.Multer.File[] }
  ) {
    try {
      const accessToken = req.cookies.accessToken;
      const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
      const idRestaurant = parseInt(auth.token.id);
      if (updateRestaurantAddressDto.updateAddressDto !== undefined &&
        updateRestaurantAddressDto.updateAddressDto !== null) {
        const idAddress: number = updateRestaurantAddressDto.updateRestaurantDto.id_address
        const updatedAddress = this.addressesService.update(updateRestaurantAddressDto.updateAddressDto, idAddress);
      }
      if (files.logo !== undefined && updateRestaurantAddressDto.updateRestaurantDto.logo !== undefined) {
        this.uploadFileService.removeImage(updateRestaurantAddressDto.updateRestaurantDto.logo);
        updateRestaurantAddressDto.updateRestaurantDto.logo = this.uploadFileService.uploadImage(files.logo[0], idRestaurant, UserType.restaurant);
      }
      if (files.banner_image !== undefined && updateRestaurantAddressDto.updateRestaurantDto.banner_image !== undefined) {
        this.uploadFileService.removeImage(updateRestaurantAddressDto.updateRestaurantDto.banner_image);
        updateRestaurantAddressDto.updateRestaurantDto.banner_image = this.uploadFileService.uploadImage(files.banner_image[0], idRestaurant, UserType.restaurant);
      }
      return await this.restaurantsService.update(idRestaurant, updateRestaurantAddressDto.updateRestaurantDto);
    }
    catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Unexpected error");
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Rimuove un ristorante specifico.' })
  @ApiResponse({ status: 200, description: 'Ristorante rimosso con successo.' })
  async remove(@Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const idRestaurant = parseInt(auth.token.id);
    const idAddress = (await this.restaurantsService.findOne(idRestaurant)).data[0].id_address;
    const removedAddress = await this.addressesService.remove(idAddress);
    return await this.restaurantsService.remove(idRestaurant);
  }
}
