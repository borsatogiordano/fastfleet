import { Injectable } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { UserRepositoryInterface } from './user-repository-interface';
import { CreateUserDto } from '../schemas/create-user.schema';
import { PrismaService } from '../../database/prisma.service';
import { UpdateUserDto } from '../controllers/update-user.controller';

@Injectable()
export class PrismaUserRepository implements UserRepositoryInterface {

  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string): Promise<PrismaUser | null> {
    return await this.prisma.user.findUnique({
      where: { id }
    });
  }

  async findByCpf(cpf: string): Promise<PrismaUser | null> {
    return await this.prisma.user.findUnique({
      where: { cpf }
    });
  }

  async create(data: CreateUserDto): Promise<void> {
    await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        cpf: data.cpf,
        password: data.password,
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id }
    })
  }

  async update(id: string, data: UpdateUserDto): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      }
    });
  }
}