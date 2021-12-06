import { Body, Controller, Get, HttpException, Post, Req } from '@nestjs/common';
import { RequiredPermissions } from '../login/login.decorator';
import { Expedition, Permission } from '@nw-company-tool/model';
import { CreateExpeditionDto } from './dto/expedition.create.dto';
import { Request } from '../app.model';
import { ExpeditionService } from './expedition.service';
import { DeleteExpeditionDto } from './dto/expedition.delete.dto';
import { JoinExpeditionDto } from './dto/expedition.join.dto';
import { LeaveExpeditionDto } from './dto/expedition.leave.dto';

@Controller('/api/expedition')
@RequiredPermissions(Permission.ENABLED)
export class ExpeditionController {
  constructor(private expeditionService: ExpeditionService) {}

  @Get('/')
  getAllExpeditions(): Promise<Expedition[]> {
    return this.expeditionService.findAll();
  }

  @Post('/')
  async createExpedition(@Req() request: Request, @Body() body: CreateExpeditionDto): Promise<void> {
    await this.expeditionService.create(request.user, body);
  }

  @Post('/delete')
  async deleteExpedition(@Req() request: Request, @Body() body: DeleteExpeditionDto): Promise<void> {
    const expedition = await this.expeditionService.findById(body.id);
    if (request.user.id === expedition.owner.userId || request.user.permissions.includes(Permission.ADMIN)) {
      await this.expeditionService.delete(body.id);
    } else {
      throw new HttpException('you are not the owner of this expedition', 403);
    }
  }

  @Post('/join')
  async joinExpedition(@Req() request: Request, @Body() body: JoinExpeditionDto): Promise<void> {
    await this.expeditionService.join(request.user, body);
  }

  @Post('/leave')
  async leaveExpedition(@Req() request: Request, @Body() body: LeaveExpeditionDto): Promise<void> {
    await this.expeditionService.leave(request.user, body);
  }
}
