import { Body, Controller, Get, Param, Patch, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common"
import { FileFieldsInterceptor } from "@nestjs/platform-express"
import { ApiBearerAuth } from "@nestjs/swagger"
import { Request } from "express"
import { UserGuard } from "src/guards/user.guard"

import { EVENT_SUCCESS_MESSAGE } from "./event.constant"
import { EventBodyDto, EventDto } from "./event.dto"
import { EventService } from "./event.service"
import { createEventDocs, getAllEventsDocs, getAllMyEventsDocs, getEventByIdDocs, updateEventDocs } from "./event.swagger"

@Controller("event")
export class EventController {
  constructor(private readonly service: EventService) {}

  @getAllEventsDocs.operation
  @getAllEventsDocs.responses.success
  @Get("all")
  async findAll() {
    const response = await this.service.getFindAll()
    return {
      success: true,
      message: EVENT_SUCCESS_MESSAGE.SUCCESS_ON_FIND,
      data: response
    }
  }

  @getEventByIdDocs.operation
  @getEventByIdDocs.responses.success
  @getEventByIdDocs.responses.notFound
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const response = await this.service.getFindOne(id)
    return {
      success: true,
      message: EVENT_SUCCESS_MESSAGE.SUCCESS_ON_FINDONE,
      data: response
    }
  }

  @getAllMyEventsDocs.operation
  @getAllMyEventsDocs.responses.success
  @Get()
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  async findMyEvents(@Req() req: Request) {
    const response = await this.service.getFindAllMyEvents(req.user)
    return {
      success: true,
      message: EVENT_SUCCESS_MESSAGE.SUCCESS_ON_FIND,
      data: response
    }
  }

  @createEventDocs.operation
  @createEventDocs.consumes
  @createEventDocs.body
  @createEventDocs.responses.success
  @createEventDocs.responses.badRequest
  @Post()
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "images", maxCount: 3 },
      { name: "files", maxCount: 3 },
      { name: "banner", maxCount: 1 }
    ])
  )
  async create(
    @UploadedFiles() files: { images?: Express.Multer.File[]; files?: Express.Multer.File[]; banner?: Express.Multer.File[] },
    @Body() payload: EventBodyDto,
    @Req() req: Request
  ) {
    const response = await this.service.postCreate(req.user, payload, files)
    return {
      success: true,
      message: EVENT_SUCCESS_MESSAGE.SUCCESS_ON_CREATE,
      data: response
    }
  }

  @updateEventDocs.operation
  @updateEventDocs.consumes
  @updateEventDocs.body
  @updateEventDocs.responses.success
  @updateEventDocs.responses.notFound
  @updateEventDocs.responses.badRequest
  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "images", maxCount: 3 },
      { name: "files", maxCount: 3 },
      { name: "banner", maxCount: 1 }
    ])
  )
  async update(
    @UploadedFiles() files: { images?: Express.Multer.File[]; files?: Express.Multer.File[]; banner?: Express.Multer.File[] },
    @Param("id") id: string,
    @Body() payload: EventDto,
    @Req() req: Request
  ) {
    const updatedEvent = await this.service.patchUpdate(id, req.user, payload, files)
    return {
      success: true,
      message: EVENT_SUCCESS_MESSAGE.SUCCESS_ON_UPDATE,
      data: updatedEvent
    }
  }
}
