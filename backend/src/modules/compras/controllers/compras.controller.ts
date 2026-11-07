/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ComprasService } from '../services/compras.service.js';
import { CreateCompraDto, UpdateCompraDto } from '../dto/compra.dto.js';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard.js';

@Controller('compras')
@UseGuards(JwtAuthGuard)
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Get()
  findAll(@Req() req: { user: { userId: string } }) {
    return this.comprasService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Req() req: { user: { userId: string } }, @Param('id') id: string) {
    return this.comprasService.findById(req.user.userId, id);
  }

  @Post()
  create(@Req() req: { user: { userId: string } }, @Body() dto: CreateCompraDto) {
    return this.comprasService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(
    @Req() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateCompraDto,
  ) {
    return this.comprasService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: { user: { userId: string } }, @Param('id') id: string) {
    return this.comprasService.remove(req.user.userId, id);
  }
}
