import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Recipient } from '@prisma/client';
import { RecipientRepositoryInterface } from './recipient-repository';
import { CreateRecipientDto } from '../controllers/create-recipient-controller';

@Injectable()
export class PrismaRecipientRepository implements RecipientRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Recipient | null> {
    return this.prisma.recipient.findUnique({ where: { id } });
  }

  async create(data: CreateRecipientDto): Promise<void> {
    await this.prisma.recipient.create({ data });
  }
}