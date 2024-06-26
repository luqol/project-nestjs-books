import { ConflictException, Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/shared/shared/prisma.service';

@Injectable()
export class BooksService {
    constructor(private prismaService: PrismaService) {}

    public getAll(): Promise <Book[]> {
        return this.prismaService.book.findMany();
    }

    public getAllExtended(): Promise <Book[]> {
        return this.prismaService.book.findMany({
            include: {author: true}
        });
    }

    public getById(id: Book['id']): Promise<Book> {
        return this.prismaService.book.findUnique({
            where: { id },
        });
    }

    public deleteById( id: Book['id']): Promise<Book> {
        return this.prismaService.book.delete({
            where: { id },
        });
    }

    public async create(bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>): Promise<Book> {
        try {
            return await this.prismaService.book.create({
                data: bookData,
            })

        } catch (err) {
            if(err.code = 'P2002')
                throw new ConflictException('Title is already taken');
            throw err;
        }
    }

    public async update( id: Book['id'], bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>): Promise<Book> {
        try{ 
            return await this.prismaService.book.update({
                where: {id},
                data: bookData,
            });
        }catch (err) {
            if(err.code = 'P2002')
                throw new ConflictException('Title is already taken');
            throw err;
        }
    }
}
