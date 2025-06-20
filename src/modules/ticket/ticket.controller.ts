import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"
import { Request } from "express"
import { UserGuard } from "src/guards/user.guard"

import { TICKET_SUCCESS_MESSAGE } from "./ticket.constant"
import { TicketBodyDto } from "./ticket.dto"
import { TicketService } from "./ticket.service"
import { createTicketDocs, getAllTicketsDocs, getTicketsByEventDocs } from "./ticket.swagger"

@ApiTags("Tickets")
@Controller("ticket")
@UseGuards(UserGuard)
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @createTicketDocs.operation
  @createTicketDocs.body
  @createTicketDocs.responses.success
  @createTicketDocs.responses.badRequest
  @Post()
  async create(@Req() req: Request, @Body() payload: TicketBodyDto) {
    const response = await this.ticketService.createNewTicket({ ...payload, userId: req.user })
    return {
      success: true,
      message: TICKET_SUCCESS_MESSAGE.SUCCESS_ON_CREATE,
      data: response
    }
  }

  @getAllTicketsDocs.operation
  @getAllTicketsDocs.responses.success
  @Get()
  async findAll(@Req() req: Request) {
    const response = await this.ticketService.findAll(req.user)
    return {
      success: true,
      message: TICKET_SUCCESS_MESSAGE.SUCCESS_ON_FIND,
      data: response
    }
  }

  @getTicketsByEventDocs.operation
  @getTicketsByEventDocs.responses.success
  @getTicketsByEventDocs.responses.notFound
  @getTicketsByEventDocs.responses.unauthorized
  @Get(":id")
  async findAllByEvent(@Req() req: Request, @Param("id") id: string) {
    const response = await this.ticketService.findEventTickets(id, req.user)
    return {
      success: true,
      message: TICKET_SUCCESS_MESSAGE.SUCCESS_ON_FIND,
      data: response
    }
  }
}
