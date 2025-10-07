import { Inject, Injectable } from '@nestjs/common';
import { CreatePackageDto } from '../controller/create-package.controller';
import { PackageRepositoryInterface } from '../repositories/package-repository';

@Injectable()
export class CreatePackageUseCase {

  constructor(
    @Inject('PackageRepositoryInterface')
    private repo: PackageRepositoryInterface) { }

  async execute(data: CreatePackageDto) {
    const newPackage = await this.repo.create(data);
  }
}