import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryInterface } from '../repositories/user-repository-interface';
import { User } from '@prisma/client';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface) { }

  async execute(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException({
        message: 'Usuário não encontrado',
      });
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}