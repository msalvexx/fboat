import { Injectable } from '@nestjs/common';
import { Card } from './card.model';

@Injectable()
export class CardService {
  private _cards: Card[] = [
    /*     new Card(
          1,
          'Card 1',
          'Description 1',
          'https://via.placeholder.com/150',
          new Date(),
          new Date(),
        ),
        new Card(
          2,
          'Card 2',
          'Description 2',
          'https://via.placeholder.com/150',
          new Date(),
          new Date(),
        ),
        new Card(
          3,
          'Card 3',
          'Description 3',
          'https://via.placeholder.com/150',
          new Date(),
          new Date(),
        ), */
  ];
  public get cards(): Card[] {
    return this._cards;
  }
  public set cards(value: Card[]) {
    this._cards = value;
  }

  obterTodos(): Card[] {
    return this.cards;
  }

  obterPorId(id: number): Card {
    return this.cards[0];
  }

  criar(card: Card) {
    this.cards.push(card);
  }

  alterar(card: Card): Card {
    return card;
  }

  apagar(id: number) {
    this.cards.pop();
  }
}
