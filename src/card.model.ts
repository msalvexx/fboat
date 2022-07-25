import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Card extends Model<Card> {
  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;
  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  description: string;
  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  image: string;
  created_at: Date;
  updated_at: Date;
}
