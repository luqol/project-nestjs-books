import { Controller, Delete, Get, Post, Put, Body, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/create-book.dto';
import { UpdateBookDTO } from './dtos/update-book.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get('/')
    getAll() {
        return this.booksService.getAll();
    }

    @Get('/extended')
    getAllExtended() {
        return this.booksService.getAllExtended();
    }
    
    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const b = await this.booksService.getById(id);
        if (!b)
            throw new NotFoundException('Book not found');
        return b;
    }

    @Delete('/:id')
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        const b = await this.booksService.getById(id);
        if (!b)
            throw new NotFoundException('Book not found');
        await this.booksService.deleteById(id);
        return {success: true};
    }

    @Post('/')
    create ( @Body() bookData: CreateBookDTO){
        return this.booksService.create(bookData);
    }

    @Put('/:id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() bookData: UpdateBookDTO
    ) {
        const b = await this.booksService.getById(id);
        if (!b)
            throw new NotFoundException('Book not found');
        await this.booksService.update(id, bookData);
        return { success: true};
    }
}
