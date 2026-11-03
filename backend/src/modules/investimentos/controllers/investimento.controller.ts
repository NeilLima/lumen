/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { InvestimentoService } from '../services/investimento.service.js';
import { CreateInvestimentoDto, UpdateInvestimentoDto } from '../dto/investimento.dto.js';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard.js';

@Controller('investimentos')
@UseGuards(JwtAuthGuard)
export class InvestimentoController {
  constructor(private readonly investimentoService: InvestimentoService) {}

  @Get()
  findAll(@Req() req: { user: { userId: string } }) {
    return this.investimentoService.findAll(req.user.userId);
  }

  @Post()
  create(@Req() req: { user: { userId: string } }, @Body() dto: CreateInvestimentoDto) {
    return this.investimentoService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(
    @Req() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateInvestimentoDto,
  ) {
    return this.investimentoService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: { user: { userId: string } }, @Param('id') id: string) {
    return this.investimentoService.remove(req.user.userId, id);
  }
}
