import { Module } from "@nestjs/common"

import { AuthController } from "./auth.controller"
import { AuthRepository } from "./auth.repository"
import { AuthService } from "./auth.service"

@Module({
  providers: [AuthService, AuthRepository],
  controllers: [AuthController]
})
export class AuthModule {}
