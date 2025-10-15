import { Body, Controller, HttpStatus, HttpCode, UseGuards, Param, Put, UsePipes, Post } from "@nestjs/common";
import { Roles, UserRole } from "src/modules/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import z from "zod";
import { CreateRecipientUseCase } from "../use-cases/create-recipient-use-case";

const createRecipientSchema = z.object({
  name: z.string("O nome deve ter pelo menos 2 caracteres").min(2),
  address: z.string("O endereço deve ter pelo menos 5 caracteres").min(5),
  city: z.string("A cidade deve ter pelo menos 2 caracteres").min(2),
  state: z.string("O estado deve ter pelo menos 2 caracteres").min(2),
  zipCode: z.string("O CEP deve ter pelo menos 5 caracteres").min(5),
});

export type CreateRecipientDto = z.infer<typeof createRecipientSchema>;

@Controller("recipients")
export class CreateRecipientController {
  constructor(
    private readonly createRecipientUseCase: CreateRecipientUseCase
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @UsePipes(new ZodValidationPipe(createRecipientSchema))
  async createRecipient(@Body() body: CreateRecipientDto): Promise<void> {
    return this.createRecipientUseCase.execute(body);
  }
}