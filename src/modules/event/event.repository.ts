import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

import { EventDto } from "./event.dto"

@Injectable()
export class EventRepository {
  constructor(private prisma: PrismaService) {}

  create(data: EventDto) {
    return this.prisma.event.create({ data })
  }

  find() {
    return this.prisma.event.findMany()
  }

  findById(id: string) {
    return this.prisma.event.findUnique({ where: { id } })
  }

  findAllByCreatorId(creatorId: string) {
    return this.prisma.event.findMany({ where: { creatorId } })
  }

  update(id: string, data: EventDto) {
    return this.prisma.event.update({ where: { id }, data })
  }
}
