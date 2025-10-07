import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { UpdateUserDto } from '../controllers/update-user.controller';
import { UserRepositoryInterface } from '../repositories/user-repository-interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async execute(id: string, data: UpdateUserDto): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // ✅ 3. Se senha foi alterada, fazer hash
    const updateData = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    // ✅ 4. Atualizar usuário
    await this.userRepository.update(id, updateData);
  }
}