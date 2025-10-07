import { Module } from "@nestjs/common";
import { CreateUserController } from "./controllers/create-user.controller";
import { CreateUserUseCase } from "./use-cases/create-user.use-case";
import { PrismaUserRepository } from "./repositories/prisma-user-repository";
import { DeleteUserController } from "./controllers/delete-user.controller";
import { DeleteUserUseCase } from "./use-cases/delete-user.use-case";
import { UpdateUserController } from "./controllers/update-user.controller";
import { UpdateUserUseCase } from "./use-cases/update-user.use-case";
import { GetUserByIdController } from "./controllers/get-user-by-id.controller";
import { GetUserByIdUseCase } from "./use-cases/get-user-by-id.use-case";

@Module({
  controllers: [
    CreateUserController,
    DeleteUserController,
    UpdateUserController,
    GetUserByIdController
  ],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    GetUserByIdUseCase,
    //Repository
    {
      provide: 'UserRepositoryInterface',
      useClass: PrismaUserRepository
    }
  ]
})
export class UserModule { }