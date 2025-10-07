import { Body, Controller, Post, Get, UsePipes, HttpStatus, HttpCode, UseGuards, Request } from "@nestjs/common";
import { createUserSchema, type CreateUserDto } from "../schemas/create-user.schema";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { CreateUserUseCase } from "../use-cases/create-user-use-case";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Roles, UserRole } from "../../auth/decorators/roles.decorator";

@Controller("users")
export class CreateUserController {

  constructor(private readonly createUserUseCase: CreateUserUseCase) { }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    await this.createUserUseCase.execute(body);
  }
}