import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.model';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async obterTodos(): Promise<Card[]> {
    return this.cardRepository.find();
  }

  async obterPorId(id: number): Promise<Card> {
    return this.cardRepository.findOneBy({ id });
  }

  async criar(card: Card) {
    const user = this.cardRepository.create(card);
    await this.cardRepository.save(card);
    return user;
  }

  async update(id: number, data: Partial<Card>) {
    await this.cardRepository.update({ id }, data);
    return await this.cardRepository.findOneBy({ id });
  }

  async apagar(id: number): Promise<void> {
    await this.cardRepository.delete(id);
    return Promise.resolve();
  }

  async uploadFile(image: any): Promise<void> {
    const card: Card = await this.obterPorId(image.id);
    card.image = image.filename;
    await this.cardRepository.update(card.id, card);
  }
}
