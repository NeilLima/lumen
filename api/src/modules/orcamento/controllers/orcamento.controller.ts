/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { OrcamentoService } from '../services/orcamento.service.js';
import { CreateOrcamentoDto, UpdateOrcamentoDto } from '../dto/orcamento.dto.js';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard.js';

@Controller('orcamento')
@UseGuards(JwtAuthGuard)
export class OrcamentoController {
  constructor(private readonly orcamentoService: OrcamentoService) {}

  @Get()
  findAll(@Req() req: { user: { userId: string } }) {
    return this.orcamentoService.findAll(req.user.userId);
  }

  @Post()
  create(@Req() req: { user: { userId: string } }, @Body() dto: CreateOrcamentoDto) {
    return this.orcamentoService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(
    @Req() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateOrcamentoDto,
  ) {
    return this.orcamentoService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: { user: { userId: string } }, @Param('id') id: string) {
    return this.orcamentoService.remove(req.user.userId, id);
  }
}
