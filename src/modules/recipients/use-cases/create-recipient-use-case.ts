import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateRecipientDto } from '../controllers/create-recipient-controller';
import { RecipientRepositoryInterface } from '../repositories/recipient-repository';

@Injectable()
export class CreateRecipientUseCase {

  constructor(
    @Inject('RecipientRepositoryInterface')
    private readonly recipientRepository: RecipientRepositoryInterface
  ) { }

  async execute(data: CreateRecipientDto): Promise<void> {
    await this.recipientRepository.create(data);
  }
}