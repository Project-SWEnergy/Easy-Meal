import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFile, InternalServerErrorException } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { ResultDishesDto } from './dto/result-dish.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserType } from '../authentication/dto/user-data.dto';
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileService } from '../upload-file/upload-file.service';



@Controller('dishes')
export class DishesController {

  constructor(
    private readonly dishesService: DishesService,
    private readonly authorizationService: AuthorizationService,
    private readonly uploadFileService: UploadFileService
  ) { }


  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createDishDto: CreateDishDto,
    @Req() req,
    @UploadedFile() file: Express.Multer.File
  ): Promise<ResultDishesDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const filePath = this.uploadFileService.uploadImage(file, auth.token.id, auth.token.role);
    createDishDto.id_restaurant = auth.token.id;
    createDishDto.image = filePath;
    return await this.dishesService.create(createDishDto);
  }


  @Get('find-all/:id')
  async findAllByRestaurantId(@Param('id') id: string): Promise<ResultDishesDto> {
    const idRestaurant = parseInt(id);
    return await this.dishesService.findAllByRestaurantId(idRestaurant);
  }


  @Get('find-one/:id')
  async findOne(@Param('id') id: string): Promise<ResultDishesDto> {
    const dishId = parseInt(id);
    return await this.dishesService.findOne(dishId);
  }


  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateDishDto: UpdateDishDto,
    @Req() req,
    @UploadedFile() file: Express.Multer.File
  ): Promise<ResultDishesDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const dishId = parseInt(id);
    if (file !== undefined) {
      const filePath = this.uploadFileService.uploadImage(file, auth.token.id, auth.token.role);
      updateDishDto.image = filePath;
      const originalDish = await this.dishesService.findOne(dishId)
      if (originalDish.data[0].image !== null)
        this.uploadFileService.removeImage(originalDish.data[0].image);
    }
    return await this.dishesService.update(dishId, updateDishDto);
  }


  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ResultDishesDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.restaurant);
    const dishId = parseInt(id);
    return await this.dishesService.remove(dishId);
  }
}
