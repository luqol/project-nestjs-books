import { Controller, Delete, Get, Post, Put, Body, NotFoundException, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/create-book.dto';
import { UpdateBookDTO } from './dtos/update-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
    @UseGuards(JwtAuthGuard)
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        const b = await this.booksService.getById(id);
        if (!b)
            throw new NotFoundException('Book not found');
        await this.booksService.deleteById(id);
        return {success: true};
    }

    @Post('/')
    @UseGuards(JwtAuthGuard)
    create ( @Body() bookData: CreateBookDTO){
        return this.booksService.create(bookData);
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
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
