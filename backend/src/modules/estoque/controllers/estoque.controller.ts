/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { EstoqueService } from '../services/estoque.service';
import { CreateEstoqueItemDto, UpdateEstoqueItemDto } from '../dto/estoque.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@Controller('estoque')
@UseGuards(JwtAuthGuard)
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Get()
  findAll(@Req() req: { user: { userId: string } }) {
    return this.estoqueService.findAll(req.user.userId);
  }

  @Post()
  create(@Req() req: { user: { userId: string } }, @Body() dto: CreateEstoqueItemDto) {
    return this.estoqueService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(
    @Req() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateEstoqueItemDto,
  ) {
    return this.estoqueService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: { user: { userId: string } }, @Param('id') id: string) {
    return this.estoqueService.remove(req.user.userId, id);
  }
}