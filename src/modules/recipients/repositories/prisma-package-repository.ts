import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RecipientRepositoryInterface } from './recipient-repotory';
import { Recipient } from '@prisma/client';

@Injectable()
export class PrismaRecipientRepository implements RecipientRepositoryInterface {

  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string): Promise<Recipient | null> {
    return this.prisma.recipient.findUnique({ where: { id } });
  }

  async create(data): Promise<void> {
    await this.prisma.recipient.create({ data });
  }
}