import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Card } from './card.model';
import { CardService } from './card.service';

@Controller('Card')
export class CardController {
  constructor(private readonly cardsService: CardService) {}

  //lista todos os cards
  @Get()
  async obterTodos(): Promise<Card[]> {
    return this.cardsService.obterTodos();
  }

  //lista os cards por id
  @Get(':id')
  async obterPorId(@Param() params): Promise<Card> {
    return this.cardsService.obterPorId(params.id);
    //return this.cards.find(card => card.id === +params.id).name;
  }

  //criar um novo card
  @Post()
  async criar(@Body() card: Card) {
    this.cardsService.criar(card);
  }

  @Put()
  async alterar(@Body() card: Card): Promise<[number, Card[]]> {
    return this.cardsService.alterar(card);
  }

  @Delete(':id')
  async apagar(@Param() params) {
    this.cardsService.apagar(params.id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }
}
