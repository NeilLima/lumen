/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CardsService } from '../services/cards.service.js';
import { CreateCardDto, UpdateCardDto } from '../dto/card.dto.js';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard.js';

@Controller('cards')
@UseGuards(JwtAuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  findAll(@Req() req: { user: { userId: string } }) {
    return this.cardsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Req() req: { user: { userId: string } }, @Param('id') id: string) {
    return this.cardsService.findById(req.user.userId, id);
  }

  @Post()
  create(@Req() req: { user: { userId: string } }, @Body() dto: CreateCardDto) {
    return this.cardsService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(
    @Req() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateCardDto,
  ) {
    return this.cardsService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: { user: { userId: string } }, @Param('id') id: string) {
    return this.cardsService.remove(req.user.userId, id);
  }
}