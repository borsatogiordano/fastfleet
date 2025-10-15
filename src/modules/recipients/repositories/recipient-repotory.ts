import { Recipient } from "@prisma/client";
import { CreateRecipientDto } from "../controllers/create-recipient-controller";

export abstract class RecipientRepositoryInterface {
  abstract create(data: CreateRecipientDto): Promise<void>
  abstract findById(id: string): Promise<Recipient | null>
}