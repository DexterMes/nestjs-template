import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

import { RegisterDto } from "./auth.dto"

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } })
  }

  async createUser(data: RegisterDto) {
    return this.prisma.user.create({ data })
  }
}
