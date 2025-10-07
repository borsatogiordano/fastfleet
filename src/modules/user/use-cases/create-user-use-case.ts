import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { CreateUserDto } from '../schemas/create-user.schema';
import { UserRepositoryInterface } from '../repositories/user-repository-interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CreateUserUseCase {

  constructor(
    @Inject('UserRepositoryInterface') 
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async execute(data: CreateUserDto): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByCpf(data.cpf);

    if (userAlreadyExists) {
      throw new BadRequestException({
        message: 'Usuário com esse CPF já existe',
      });
    }

    // Hash the password before storing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }
}