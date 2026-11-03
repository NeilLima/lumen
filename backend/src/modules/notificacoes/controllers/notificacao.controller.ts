/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { NotificacaoService } from '../services/notificacao.service.js';
import { CreateNotificacaoDto, UpdateNotificacaoDto } from '../dto/notificacao.dto.js';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard.js';

@Controller('notificacao')
@UseGuards(JwtAuthGuard)
export class NotificacaoController {
  constructor(private readonly notificacaoService: NotificacaoService) {}

  @Get()
  findAll(@Req() req: { user: { userId: string } }) {
    return this.notificacaoService.findAll(req.user.userId);
  }

  @Post()
  create(@Req() req: { user: { userId: string } }, @Body() dto: CreateNotificacaoDto) {
    return this.notificacaoService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(
    @Req() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateNotificacaoDto,
  ) {
    return this.notificacaoService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: { user: { userId: string } }, @Param('id') id: string) {
    return this.notificacaoService.remove(req.user.userId, id);
  }
}
