import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { UserRepositoryInterface } from '../repositories/user-repository-interface';

@Injectable()
export class DeleteUserUseCase {

  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface
  ) { }

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new BadRequestException({
        message: 'Usuário não encontrado',
      });
    }

    await this.userRepository.delete(id);
  }
}