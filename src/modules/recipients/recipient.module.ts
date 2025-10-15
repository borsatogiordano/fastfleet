import { Module } from "@nestjs/common";
import { CreateRecipientController } from "./controllers/create-recipient-controller";
import { CreateRecipientUseCase } from "./use-cases/create-recipient-use-case";
import { PrismaRecipientRepository } from "./repositories/prisma-recipient-repository";

@Module({
  controllers: [CreateRecipientController],
  providers: [
    CreateRecipientUseCase,
    {
      provide: 'RecipientRepositoryInterface',
      useClass: PrismaRecipientRepository
    }
  ]
})
export class RecipientModule { }