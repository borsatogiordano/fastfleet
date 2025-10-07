import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PackageRepositoryInterface } from './package-repository';
import { Package } from '@prisma/client';
import { CreatePackageDto } from '../controller/create-package.controller';

@Injectable()
export class PrismaPackageRepository implements PackageRepositoryInterface {

  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string): Promise<Package | null> {
    return await this.prisma.package.findUnique({
      where: { id }
    });
  }

  async create(data: CreatePackageDto): Promise<void> {
    await this.prisma.package.create({
      data: {
        description: data.description,
        recipientId: data.recipientId,
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.package.delete({
      where: { id }
    })
  }
}