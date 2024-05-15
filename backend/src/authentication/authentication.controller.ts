import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationDto } from './dto/authentication.dto';
import { ResultAuthenticationDto } from './dto/result-authentication-user.dto';
import { AuthorizationService } from '../authorization/authorization.service'
import { Response, Request } from 'express';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('authentication')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly authorizationService: AuthorizationService
    ) { }


    @Post('signin-user')
    @ApiOperation({ summary: 'Effettua il login di un utente' })
    @ApiResponse({ status: 200, description: 'Login effettuato con successo.', type: ResultAuthenticationDto })
    @ApiBody({ type: AuthenticationDto })
    async signinUser(@Body() authenticationDto: AuthenticationDto, @Res() res): Promise<ResultAuthenticationDto> {
        try {
            const result = await this.authenticationService.signinUser(authenticationDto);
            if (!result.result)
                throw new Error("Authentication failed")
            const accessToken = await this.authenticationService.generateAccessToken(result.user);
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
            });
            return res.status(200).json(result);
        }
        catch (error) {
            console.error("Authentication failed", error)
            throw new Error("Authentication failed")
        }
    }

    @Post('signin-restaurant')
    @ApiOperation({ summary: 'Effettua il login di un ristorante' })
    @ApiResponse({ status: 200, description: 'Login effettuato con successo.', type: ResultAuthenticationDto })
    @ApiBody({ type: AuthenticationDto })
    async signinRestaurant(@Body() authenticationDto: AuthenticationDto, @Res() res): Promise<ResultAuthenticationDto> {
        try {
            const result = await this.authenticationService.signinRestaurant(authenticationDto);
            if (!result.result)
                throw new Error("Authentication failed")
            const accessToken = await this.authenticationService.generateAccessToken(result.user);
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
            });
            return res.status(200).json(result);
        }
        catch (error) {
            console.error("Authentication failed", error)
            const result = {
                result: false,
                message: "Internal server error."
            }
            return res.status(500).json(result);
        }
    }

    @Post('signout')
    @ApiOperation({ summary: 'Effettua il logout' })
    @ApiResponse({ status: 200, description: 'Logout effettuato con successo.' })
    async signout(@Res() res: Response, @Req() req: Request): Promise<any> {
        const accessToken = req.cookies.accessToken;
        try {
            const auth = this.authorizationService.isAuthorized(accessToken);
            res.clearCookie('accessToken');
            return res.status(200).json({ message: 'Logout successful' });
        }
        catch (error) {
            console.error('Logout failed', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get('setup')
    @ApiOperation({ summary: 'Setup' })
    @ApiResponse({ status: 200, description: 'Setup effettuato con successo.' })
    findDataFromToken(@Req() req) {
        const accessToken = req.cookies.accessToken;
        const auth = this.authorizationService.isAuthorized(accessToken);
        return {
            result: true,
            message: "Valid token",
            data: [
				auth.token
            ]
        }
    }

}


