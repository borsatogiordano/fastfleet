import { Module } from "@nestjs/common";
import { CreatePackageController } from "./controller/create-package.controller";
import { CreatePackageUseCase } from "./use-cases/create-package-use-case";
import { PrismaPackageRepository } from "./repositories/prisma-package-repository";

@Module({
  controllers: [CreatePackageController],
  providers: [
    CreatePackageUseCase,
    {
      provide: 'PackageRepositoryInterface',
      useClass: PrismaPackageRepository
    }
  ]
})
export class PackageModule { }