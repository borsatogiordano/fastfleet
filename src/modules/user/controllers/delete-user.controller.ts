import { Controller, HttpStatus, HttpCode, UseGuards, Param, Delete } from "@nestjs/common";
import { Roles, UserRole } from "src/modules/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { DeleteUserUseCase } from "../use-cases/delete-user.use-case";

@Controller("users")
export class DeleteUserController {

  constructor(
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) { }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteUser(@Param("id") id: string): Promise<void> {
    return this.deleteUserUseCase.execute(id);
  }
}