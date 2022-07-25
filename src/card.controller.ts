import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Card } from './card.model';
import { CardService } from './card.service';

@Controller('Card')
export class CardController {
  constructor(private cardsService: CardService) {}

  //lista todos os cards
  @Get()
  obterTodos(): Card[] {
    return this.cardsService.obterTodos();
  }

  //lista os cards por id
  @Get(':id')
  obterPorId(@Param() params): Card {
    return this.cardsService.obterPorId(params.id);
    //return this.cards.find(card => card.id === +params.id).name;
  }

  //criar um novo card
  @Post()
  criar(@Body() card: Card) {
    this.cardsService.criar(card);
  }

  @Put()
  alterar(@Body() card: Card): Card {
    return this.cardsService.alterar(card);
  }

  @Delete(':id')
  apagar(@Param() params) {
    this.cardsService.apagar(params.id);
  }
}
