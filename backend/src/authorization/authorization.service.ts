import { ForbiddenException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '../authentication/dto/user-data.dto';

@Injectable()
export class AuthorizationService {
  
  constructor(
    private readonly jwtService: JwtService
  ) { }


  verifyTokenAndRole(accessToken: string, expectedRole?: UserType): any {
    if (!accessToken) {
      throw new UnauthorizedException("Missing token");
    }
    let decodedToken: any;
    try {
      decodedToken = this.jwtService.verify(accessToken);
    }
    catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
    /*
    if (expectedRole !== undefined && decodedToken.role !== expectedRole && decodedToken.user.role !== expectedRole) {
      throw new ForbiddenException("Unauthorized user");
    }
    */
    if (expectedRole !== undefined && decodedToken.role !== expectedRole) {
      throw new ForbiddenException("Unauthorized user");
    }
    return decodedToken;
  }


  isAuthorized(accessToken: string, role?: UserType): { token: any } {
    const decodedToken = this.verifyTokenAndRole(accessToken, role);
    return { token: decodedToken };
  }


}
