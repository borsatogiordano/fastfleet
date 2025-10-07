import { CreateUserDto } from '../schemas/create-user.schema';

export abstract class UserRepositoryInterface {
  abstract findByCpf(cpf: string): Promise<any | null>;
  abstract create(data: CreateUserDto): Promise<void>;
  abstract delete(id: string): Promise<void>;
}