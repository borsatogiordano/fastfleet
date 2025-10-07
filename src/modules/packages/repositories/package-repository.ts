import { CreatePackageDto } from "../controller/create-package.controller";

export abstract class PackageRepositoryInterface {
  abstract create(data: CreatePackageDto): Promise<void>
}