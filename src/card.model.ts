import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  category: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
