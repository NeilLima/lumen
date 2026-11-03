/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { MetasService } from '../services/metas.service.js';
import { CreateMetaDto, UpdateMetaDto } from '../dto/meta.dto.js';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard.js';

@Controller('metas')
@UseGuards(JwtAuthGuard)
export class MetasController {
  constructor(private readonly metasService: MetasService) {}

  @Get()
  findAll(@Req() req: { user: { userId: string } }) {
    return this.metasService.findAll(req.user.userId);
  }

  @Post()
  create(@Req() req: { user: { userId: string } }, @Body() dto: CreateMetaDto) {
    return this.metasService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(
    @Req() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateMetaDto,
  ) {
    return this.metasService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: { user: { userId: string } }, @Param('id') id: string) {
    return this.metasService.remove(req.user.userId, id);
  }
}