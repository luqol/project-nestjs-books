import { Body, Controller, Delete, Get, Post, NotFoundException, Param, ParseUUIDPipe, Put, UseGuards } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDTO } from './dtos/create-author.dto'
import { UpdateAuthorDTO } from './dtos/update-author.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('authors')
export class AuthorsController {
    constructor(private authorService: AuthorsService) {}

    @Get('/')
    getAll() {
      return this.authorService.getAll();
    }

    @Get('/extended')
    getAllExtended() {
      return this.authorService.getAllExtended();
    }

    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string){
        const a = await this.authorService.getById(id);
        if (!a)
            throw new NotFoundException('Author not found');
        return a;
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string){
        if ( !(await this.authorService.getById(id)))
            throw new NotFoundException('Author not found');
        await this.authorService.deleteById(id);
        return {success: true};
    }

    @Post('/')
    @UseGuards(JwtAuthGuard)
    create( @Body() authorData: CreateAuthorDTO){
        return this.authorService.create(authorData);
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    async update (
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() authorData: UpdateAuthorDTO
    ) {
        if ( !( await this.authorService.getById(id)))
            throw new NotFoundException('Author not found');
        await this.authorService.update(id, authorData);
        return {success: true};
    }

}
