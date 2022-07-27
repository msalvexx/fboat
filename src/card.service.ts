import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './card.model';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card)
    private cardModel: typeof Card,
  ) {}

  async obterTodos(): Promise<Card[]> {
    return this.cardModel.findAll();
  }

  async obterPorId(id: number): Promise<Card> {
    return this.cardModel.findByPk(id);
  }

  async criar(card: Card) {
    this.cardModel.create(card);
  }

  async alterar(card: Card): Promise<[number, Card[]]> {
    return this.cardModel.update(card, {
      returning: true,
      where: {
        id: card.id,
      },
    });
  }

  async apagar(id: number): Promise<void> {
    const card: Card = await this.obterPorId(id);
    card.destroy();
  }
}

/*   async uploadFile(image: any): Promise<void> {
    const card: Card = await this.obterPorId(image.id);
    card.image = image.filename;
    card.save();
  } */
