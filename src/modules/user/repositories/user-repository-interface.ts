import { User } from '@prisma/client';
import { CreateUserDto } from '../schemas/create-user.schema';
import { UpdateUserDto } from '../controllers/update-user.controller';

export abstract class UserRepositoryInterface {
  abstract findById(id: string): Promise<User | null>;
  abstract findByCpf(cpf: string): Promise<any | null>;
  abstract create(data: CreateUserDto): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string, data: UpdateUserDto): Promise<void>;
}