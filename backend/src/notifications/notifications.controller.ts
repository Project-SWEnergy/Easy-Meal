import { Controller, Get, Patch, Param, BadRequestException, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { UserType } from '../authentication/dto/user-data.dto';
import { ResultNotificationsDto } from './dto/result-notifications.dto';
import { AuthorizationService } from '../authorization/authorization.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';


@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly authorizationService: AuthorizationService
  ) { }


  @Get()
  @ApiOperation({ summary: 'Cerca tutte le notifiche associate all\'utente' })
  @ApiResponse({ status: 200, description: 'Notifiche trovate con successo.', type: ResultNotificationsDto })
  async findAllByUserIdAndRole(@Req() req): Promise<ResultNotificationsDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    return await this.notificationsService.findAllByUserIdAndRole(auth.token.id, auth.token.role);
  }

  @Patch(':idNotification')
  @ApiOperation({ summary: 'Aggiorna una notifica' })
  @ApiResponse({ status: 200, description: 'Notifica aggiornata con successo.', type: ResultNotificationsDto })
  @ApiParam({ name: 'idNotification', type: 'number', description: 'ID notifica' })
  async update(@Param('idNotification') idNotification: string, @Req() req): Promise<ResultNotificationsDto> {
    const accessToken = req.cookies.accessToken;
    const auth = this.authorizationService.isAuthorized(accessToken);
    const id = parseInt(idNotification);
    if (!Number.isInteger(id))
      throw new BadRequestException("Invalid ID");
    return await this.notificationsService.update(id);
  }

}
