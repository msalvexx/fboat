import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Card } from './card.model';
import { CardService } from './card.service';

@Controller('Card')
export class CardController {
  constructor(private readonly cardRepository: CardService) {}

  //lista todos os cards
  @Get()
  async obterTodos(): Promise<Card[]> {
    return this.cardRepository.obterTodos();
  }

  //lista os cards por id
  @Get(':id')
  async obterPorId(@Param() params): Promise<Card> {
    return this.cardRepository.obterPorId(params.id);
    //return this.cards.find(card => card.id === +params.id).name;
  }

  //criar um novo card
  @Post()
  async criar(@Body() card: Card) {
    this.cardRepository.criar(card);
  }

  @Patch(':id')
  async uppdateUser(@Param('id') id: number, @Body() data: Partial<Card>) {
    await this.cardRepository.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
    };
  }

  @Delete(':id')
  async apagar(@Param() params) {
    this.cardRepository.apagar(params.id);
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
