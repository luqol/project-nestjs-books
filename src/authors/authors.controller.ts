import { Body, Controller, Delete, Get, Post, NotFoundException, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDTO } from './dtos/create-author.dto'
import { UpdateAuthorDTO } from './dtos/update-author.dto';

@Controller('authors')
export class AuthorsController {
    constructor(private authorService: AuthorsService) {}

    @Get('/')
    getAll() {
      return this.authorService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string){
        const a = await this.authorService.getById(id);
        if (!a)
            throw new NotFoundException('Author not found');
        return a;
    }

    @Delete('/:id')
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string){
        if ( !(await this.authorService.getById(id)))
            throw new NotFoundException('Author not found');
        await this.authorService.deleteById(id);
        return {success: true};
    }

    @Post('/')
    create( @Body() authorData: CreateAuthorDTO){
        return this.authorService.create(authorData);
    }

    @Put('/:id')
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
