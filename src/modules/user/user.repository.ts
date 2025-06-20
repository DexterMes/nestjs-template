import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

import { UserDto } from "./user.dto"

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  getUser(id: string) {
    return this.prisma.user.findUnique({ omit: { password: true }, where: { id } })
  }

  updateUser(id: string, data: UserDto) {
    return this.prisma.user.update({ omit: { password: true }, where: { id }, data })
  }
}
