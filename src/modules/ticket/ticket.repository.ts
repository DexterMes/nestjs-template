import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

import { TicketDto } from "./ticket.dto"

@Injectable()
export class TicketRepository {
  constructor(private prisma: PrismaService) {}

  create(data: TicketDto) {
    return this.prisma.ticket.create({ data })
  }

  findAllUserTickets(userId: string) {
    return this.prisma.ticket.findMany({ where: { userId } })
  }

  findAllEventTickets(eventId: string) {
    return this.prisma.ticket.findMany({ where: { eventId } })
  }
}
