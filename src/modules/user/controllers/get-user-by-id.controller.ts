import { Controller, HttpStatus, HttpCode, UseGuards, Param, Delete, Get } from "@nestjs/common";
import { Roles, UserRole } from "src/modules/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.use-case";
import { User } from "@prisma/client";

@Controller("users")
export class GetUserByIdController {

  constructor(
    private readonly getUserByIdUseCase: GetUserByIdUseCase
  ) { }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getUserById(@Param("id") id: string): Promise<Omit<User, 'password'> | null> {
    return this.getUserByIdUseCase.execute(id);
  }
}