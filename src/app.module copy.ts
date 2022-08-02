import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardController } from './card/card.controller';
import { Card } from './card/card.entity';
import { CardService } from './card/card.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'card-api',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Card]),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, CardController],
  providers: [AppService, CardService],
})
export class AppModule {}
