import { Injectable, ConflictException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    public getAll(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }

    public getById(id: User['id']): Promise<User> {
        return this.prismaService.user.findUnique( {
            where: {id},
        })
    }

    public getByEmail(email: User['email']): Promise<User> {
        return this.prismaService.user.findUnique( {
            where: {email},
            include: {password: true}
        })
    }

    public async create(userData: Omit<User, 'id' | 'role'>, password: string): Promise<User>{
        try{
            return await this.prismaService.user.create( {
                data: {
                    ...userData,
                    password: {
                        create: {
                            hashedPassword: password,
                        },
                    },
                },
            });

        } catch (err) {
            if (err.code === 'P2002')
                throw new ConflictException('Email is already taken');
              throw err;
        }
    }

    public async updateById(id: User['id'], userData: Omit<User, 'id'>, password: string | undefined): Promise<User> {
        try{
            if ( password === undefined){
                return await this.prismaService.user.update( {
                    where: {id},
                    data: userData,
                });
            }else {
                return await this.prismaService.user.update({
                    where: {id},
                    data: {
                        ...userData,
                        password: {
                            update: {
                                hashedPassword: password,
                            }
                        },
                    },
                });
            }
        } catch(err) {
            if (err.code === 'P2002')
                throw new ConflictException('Email is already taken');
              throw err;
        }
    }

    public deleteById(id: User['id']): Promise<User> {
        return this.prismaService.user.delete({
            where: {id},
        });
    }
}
