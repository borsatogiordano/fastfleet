import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from '../controller/create-package.controller';
import { PackageRepositoryInterface } from '../repositories/package-repository';
import { RecipientRepositoryInterface } from 'src/modules/recipients/repositories/recipient-repository';

@Injectable()
export class CreatePackageUseCase {

  constructor(
    @Inject('PackageRepositoryInterface')
    private repo: PackageRepositoryInterface,

    @Inject('RecipientRepositoryInterface')
    private readonly recipientRepository: RecipientRepositoryInterface
  ) { }

  async execute(data: CreatePackageDto) {
    const recipientExists = await this.recipientRepository.findById(data.recipientId);

    if (!recipientExists) {
      throw new NotFoundException('Recipient not found');
    }

    await this.repo.create(data);
  }
}