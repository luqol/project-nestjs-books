import { Controller, Get, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/')
    getAll() {
        return this.usersService.getAll();
    }

    @Get('/:id')
    async getById( @Param('id', new ParseUUIDPipe()) id: string) {
        const u = await this.usersService.getById(id);
        if (!u)
            throw new NotFoundException('User not found');
        return u;
    }
}
