import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardController } from './card.controller';
import { Card } from './card.model';
import { CardService } from './card.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'card-api',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Card]),
  ],
  controllers: [AppController, CardController],
  providers: [AppService, CardService],
})
export class AppModule {}
