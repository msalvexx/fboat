import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardController } from './card.controller';
import { Card } from './card.model';
import { CardService } from './card.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'card-api',
      entities: [Card, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Card]),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, CardController],
  providers: [AppService, CardService],
})
export class AppModule {}
