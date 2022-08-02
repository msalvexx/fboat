import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { Card } from './card.entity';
import { CardService } from './card.service';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';

@Controller('Card')
export class CardController {
  constructor(private readonly cardRepository: CardService) {}

  //lista todos os cards
  @Get()
  async obterTodos(): Promise<Card[]> {
    return this.cardRepository.obterTodos();
  }

  //lista os cards por id
  @Get(':id')
  async obterPorId(@Param() params): Promise<Card> {
    return this.cardRepository.obterPorId(params.id);
    //return this.cards.find(card => card.id === +params.id).name;
  }

  //criar um novo card
  @Post()
  async criar(@Body() card: Card) {
    this.cardRepository.criar(card);
  }

  @Patch(':id')
  async uppdateUser(@Param('id') id: number, @Body() data: Partial<Card>) {
    await this.cardRepository.update(id, data);
    console.log(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
    };
  }

  @Delete(':id')
  async apagar(@Param() params) {
    this.cardRepository.apagar(params.id);
  }

  // Image upload
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    console.log(response);
    return response;
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get('file/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
}
