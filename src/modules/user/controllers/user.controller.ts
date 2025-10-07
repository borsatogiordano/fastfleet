import { Body, Controller, Post, Get, UsePipes, HttpStatus, HttpCode, UseGuards, Request } from "@nestjs/common";
import { createUserSchema, type CreateUserDto } from "../schemas/create-user.schema";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { CreateUserUseCase } from "../use-cases/create-user-use-case";
import { Roles, UserRole } from "src/modules/auth/decorators/roles.decorator";

@Controller("users")
export class CreateUserController {

  constructor(private readonly createUserUseCase: CreateUserUseCase) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.ADMIN)
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    await this.createUserUseCase.execute(body);
  }
}