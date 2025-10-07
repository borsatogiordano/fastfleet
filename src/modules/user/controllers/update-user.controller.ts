import { Body, Controller, HttpStatus, HttpCode, UseGuards, Param, Put, UsePipes } from "@nestjs/common";
import { Roles, UserRole } from "src/modules/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import z from "zod";
import { UpdateUserUseCase } from "../use-cases/update-user.use-case";

const updateUserSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  password: z.string().min(8).optional(),
  role: z.enum(UserRole).optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

@Controller("users")
export class UpdateUserController {
  constructor(
    private readonly updateUserUseCase: UpdateUserUseCase
  ) { }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  async updateUser(@Param("id") id: string, @Body() body: UpdateUserDto): Promise<void> {
    return this.updateUserUseCase.execute(id, body);
  }
}