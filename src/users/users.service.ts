import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UsersDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async showAll() {
    return await this.usersRepository.find();
  }

  async create(data: UsersDTO) {
    const user = this.usersRepository.create(data);
    await this.usersRepository.save(data);
    return user;
  }

  async findByEmail(email: string): Promise<UsersDTO> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }
  async findOne(username: string): Promise<UsersDTO> {
    return await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async read(id: number) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<UsersDTO>) {
    await this.usersRepository.update({ id }, data);
    return await this.usersRepository.findOneBy({ id });
  }

  async destroy(id: number) {
    await this.usersRepository.delete({ id });
    return { deleted: true };
  }
}
