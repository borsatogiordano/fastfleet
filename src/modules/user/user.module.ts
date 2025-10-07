import { Module } from "@nestjs/common";
import { CreateUserController } from "./controllers/user.controller";
import { CreateUserUseCase } from "./use-cases/create-user-use-case";
import { PrismaUserRepository } from "./repositories/prisma-user-repository";

@Module({
  controllers: [
    CreateUserController
  ],
  providers: [
    CreateUserUseCase,
    {
      provide: 'UserRepositoryInterface',
      useClass: PrismaUserRepository
    }
  ]
})
export class UserModule { }