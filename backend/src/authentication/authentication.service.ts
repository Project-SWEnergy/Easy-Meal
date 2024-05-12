import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthenticationDto } from './dto/authentication.dto';
import * as argon from 'argon2';
import { restaurants, users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { ResultAuthenticationDto } from './dto/result-authentication-user.dto';
import { DatabaseService } from '../database/database.service';
import { UserType } from './dto/user-data.dto';

@Injectable()
export class AuthenticationService {
    
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private databaseService: DatabaseService
    ) { }

    async generateAccessToken(userData: any): Promise<string> {
        try {
            const jwtSecret = this.configService.get('JWT_SECRET');
            const jwtExpiresIn = this.configService.get('JWT_EXPIRES_IN');
            const options = {
                expiresIn: jwtExpiresIn,
                secret: jwtSecret
            }
            return await this.jwtService.signAsync(userData, options);
        }
        catch (error) {
            console.error('Error occurred during token generation:', error);
            throw new InternalServerErrorException('Error occurred during token generation.');
        }
    }


    async signinUser(dto: AuthenticationDto): Promise<ResultAuthenticationDto> {
        try {
            const database = this.databaseService.getDatabase();
            const user = await database
                .select()
                .from(users)
                .where(eq(users.email, dto.email));
            if (user.length <= 0)
                throw new BadRequestException("User not found");
            const passwordMatches = await argon.verify(user[0].password, dto.password);
            if (!passwordMatches)
                throw new BadRequestException("Wrong password");
            const userData = {
                id: user[0].id,
                role: UserType.user
            };
            return {
                result: true,
                message: "User authenticated",
                user: userData
            }
        }
        catch (error) {
            console.error('Authentication error:', error);
            return {
                result: false,
                message: 'Credentials incorrect',
                user: null
            }
        }
    } 

    async signinRestaurant(dto: AuthenticationDto): Promise<ResultAuthenticationDto> {
        try {
            const database = await this.databaseService.getDatabase();
            const restaurant = await database
                .select()
                .from(restaurants)
                .where(eq(restaurants.email, dto.email));
            if (restaurant.length <= 0)
                throw new BadRequestException("User not found");
            const passwordMatches = await argon.verify(restaurant[0].password, dto.password);
            if (!passwordMatches)
                throw new BadRequestException("Wrong password");
            const restaurantData = {
                id: restaurant[0].id,
                role: UserType.restaurant
            };
            return {
                result: true,
                message: "Restaurant authenticated",
                user: restaurantData
            }
        }
        catch (error) {
            console.error('Authentication error:', error);
            return {
                result: false,
                message: 'Credentials incorrect',
                user: null
            }
        }
    }
}
