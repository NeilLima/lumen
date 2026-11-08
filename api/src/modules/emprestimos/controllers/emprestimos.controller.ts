/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { EmprestimosService } from '../services/emprestimos.service.js';
import { CreateEmprestimoDto, UpdateEmprestimoDto } from '../dto/emprestimo.dto.js';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard.js';

@Controller('emprestimos')
@UseGuards(JwtAuthGuard)
export class EmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService) {}

  @Get()
  findAll(@Req() req: { user: { userId: string } }) {
    return this.emprestimosService.findAll(req.user.userId);
  }

  @Post()
  create(@Req() req: { user: { userId: string } }, @Body() dto: CreateEmprestimoDto) {
    return this.emprestimosService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(
    @Req() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateEmprestimoDto,
  ) {
    return this.emprestimosService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: { user: { userId: string } }, @Param('id') id: string) {
    return this.emprestimosService.remove(req.user.userId, id);
  }
}
