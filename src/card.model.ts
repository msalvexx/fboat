export class Card {
  id: number;
  name: string;
  description: string;
  image: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number,
    name: string,
    description: string,
    image: string,
    created_at: Date,
    updated_at: Date,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
