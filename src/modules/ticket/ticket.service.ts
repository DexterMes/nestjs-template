import { Injectable } from "@nestjs/common"
import { DatabaseRecordNotFound, NotAuthorizedError } from "src/errors/api-error"

import { EVENT_ERROR_MESSAGE } from "../event/event.constant"
import { EventRepository } from "../event/event.repository"
import { TicketDto } from "./ticket.dto"
import { TicketRepository } from "./ticket.repository"

@Injectable()
export class TicketService {
  constructor(
    private readonly repository: TicketRepository,
    private readonly eventRepository: EventRepository
  ) {}

  async createNewTicket(payload: TicketDto) {
    const ticket = await this.repository.create(payload)
    return ticket
  }

  async findAll(id: string) {
    const tickets = await this.repository.findAllUserTickets(id)
    return tickets
  }

  async findEventTickets(eventId: string, userId: string) {
    const event = await this.eventRepository.findById(eventId)
    if (!event) throw new DatabaseRecordNotFound(EVENT_ERROR_MESSAGE.NOT_FOUND)

    if (event.creatorId !== userId) throw new NotAuthorizedError()

    const tickets = await this.repository.findAllEventTickets(eventId)
    return tickets
  }
}
