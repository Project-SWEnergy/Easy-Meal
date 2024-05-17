import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; 

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }, 
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthorizationService],
  exports: [AuthorizationService]
})
export class AuthorizationModule {}
