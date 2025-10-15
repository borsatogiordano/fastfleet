import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles, UserRole } from "src/modules/auth/decorators/roles.decorator";
import z from "zod";
import { CreatePackageUseCase } from "../use-cases/create-package-use-case";

export const createPackageSchema = z.object({
  description: z.string().min(5, 'A descrição deve ter pelo menos 5 caracteres'),
  recipientId: z.string().cuid('recipientId deve ser um cuid válido'),
});

export type CreatePackageDto = z.infer<typeof createPackageSchema>;

@Controller('packages')
export class CreatePackageController {
  constructor(private createPackageUseCase: CreatePackageUseCase) { }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @UsePipes(new ZodValidationPipe(createPackageSchema))
  create(@Body() dto: CreatePackageDto) {
    return this.createPackageUseCase.execute(dto);
  }
}