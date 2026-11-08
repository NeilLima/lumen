/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { DividasService } from '../services/dividas.service.js';
import { CreateDividaDto, UpdateDividaDto } from '../dto/divida.dto.js';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard.js';

@Controller('dividas')
@UseGuards(JwtAuthGuard)
export class DividasController {
  constructor(private readonly dividasService: DividasService) {}

  @Get()
  findAll(@Req() req: { user: { userId: string } }) {
    return this.dividasService.findAll(req.user.userId);
  }

  @Post()
  create(@Req() req: { user: { userId: string } }, @Body() dto: CreateDividaDto) {
    return this.dividasService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(
    @Req() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateDividaDto,
  ) {
    return this.dividasService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: { user: { userId: string } }, @Param('id') id: string) {
    return this.dividasService.remove(req.user.userId, id);
  }
}
