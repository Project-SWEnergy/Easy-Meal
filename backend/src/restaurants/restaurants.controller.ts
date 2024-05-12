import { Controller, Get, Post, Body, Patch, Param, Delete, Res, InternalServerErrorException, UseInterceptors, UploadedFile, UploadedFiles, Req } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { AuthorizationService } from 'src/authorization/authorization.service';
import { UserType } from 'src/authentication/dto/user-data.dto';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { Response } from 'express'; // Import for req and res types
import { CreateRestaurantAddressDto } from './dto/create-restaurant-address.dto';
import { AddressesService } from 'src/addresses/addresses.service';
import { UpdateRestaurantAddressDto } from './dto/update-restaurant-address.dto';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadFileService } from 'src/upload-file/upload-file.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';


@Controller('restaurants')
export class RestaurantsController {

  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly addressesService: AddressesService,
    private readonly authorizationService: AuthorizationService,
    private readonly authenticationService: AuthenticationService,
    private readonly uploadFileService: UploadFileService
  ) { }

  @Post('create')
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
  async findAll() {
    return await this.restaurantsService.findAll();
  }

  @Get('find-all-by-city/:cityName')
  async findAllByCity(@Param('cityName') cityName: string) {
    return await this.restaurantsService.findAllByCity(cityName);
  }

  @Get('find-one/:id')
  async findOne(@Param('id') id: string) {
    const idRestaurant = parseInt(id);
    return await this.restaurantsService.findOne(idRestaurant);
  }

  @Patch()
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
  async remove(@Req() req) {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const idRestaurant = parseInt(auth.token.id);
    const idAddress = (await this.restaurantsService.findOne(idRestaurant)).data[0].id_address;
    const removedAddress = await this.addressesService.remove(idAddress);
    return await this.restaurantsService.remove(idRestaurant);
  }
}
