import { Controller, Post, Body, Patch, Get, Delete, Req, Res, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResultUserDto } from './dto/result-user.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserType } from '../authentication/dto/user-data.dto';
import { AuthenticationService } from '../authentication/authentication.service';
import { Response } from 'express'; 


@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private readonly authorizationService: AuthorizationService,
    private readonly authenticationService: AuthenticationService
  ) { }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<any> {
    const result = await this.usersService.create(createUserDto);
    if (!result.result)
      throw new InternalServerErrorException("Creation failed")
    const authenticationDto = {
      email: result.data[0].email,
      password: result.data[0].password
    }
    const userData = await this.authenticationService.signinUser(authenticationDto);
    if (!userData.result)
      throw new InternalServerErrorException("Authentication failed");
    const accessToken = await this.authenticationService.generateAccessToken(userData.user);
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

  @Get()
  async findOne(@Req() req): Promise<ResultUserDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    return await this.usersService.findOne(auth.token.id);
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req): Promise<ResultUserDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    return await this.usersService.update(updateUserDto, auth.token.id);
  }

  @Delete()
  async remove(@Req() req): Promise<ResultUserDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken, UserType.user);
    return await this.usersService.remove(auth.token.id);
  }

}
