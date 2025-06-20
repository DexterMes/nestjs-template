import { Module } from "@nestjs/common"

import { EventRepository } from "../event/event.repository"
import { TicketController } from "./ticket.controller"
import { TicketRepository } from "./ticket.repository"
import { TicketService } from "./ticket.service"

@Module({
  controllers: [TicketController],
  providers: [TicketService, TicketRepository, EventRepository]
})
export class TicketModule {}
