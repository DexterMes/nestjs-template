import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common"
import { Request } from "express"
import { UserGuard } from "src/guards/user.guard"

import { TICKET_SUCCESS_MESSAGE } from "./ticket.constant"
import { TicketBodyDto } from "./ticket.dto"
import { TicketService } from "./ticket.service"

@Controller("ticket")
@UseGuards(UserGuard)
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async create(@Req() req: Request, @Body() payload: TicketBodyDto) {
    const response = await this.ticketService.createNewTicket({ ...payload, userId: req.user })
    return {
      success: true,
      message: TICKET_SUCCESS_MESSAGE.SUCCESS_ON_CREATE,
      data: response
    }
  }

  @Get()
  async findAll(@Req() req: Request) {
    const response = await this.ticketService.findAll(req.user)
    return {
      success: true,
      message: TICKET_SUCCESS_MESSAGE.SUCCESS_ON_FIND,
      data: response
    }
  }

  @Get(":id")
  async findAllByEvent(@Req() req: Request, @Param() id: string) {
    const response = await this.ticketService.findEventTickets(id, req.user)
    return {
      success: true,
      message: TICKET_SUCCESS_MESSAGE.SUCCESS_ON_FIND,
      data: response
    }
  }
}
