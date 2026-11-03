/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ConfiguracaoService } from '../services/configuracao.service.js';
import { CreateConfiguracaoDto, UpdateConfiguracaoDto } from '../dto/configuracao.dto.js';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard.js';

@Controller('configuracoes')
@UseGuards(JwtAuthGuard)
export class ConfiguracaoController {
  constructor(private readonly configuracaoService: ConfiguracaoService) {}

  @Get()
  findAll(@Req() req: { user: { userId: string } }) {
    return this.configuracaoService.findAll(req.user.userId);
  }

  @Post()
  create(@Req() req: { user: { userId: string } }, @Body() dto: CreateConfiguracaoDto) {
    return this.configuracaoService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(
    @Req() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateConfiguracaoDto,
  ) {
    return this.configuracaoService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: { user: { userId: string } }, @Param('id') id: string) {
    return this.configuracaoService.remove(req.user.userId, id);
  }
}
