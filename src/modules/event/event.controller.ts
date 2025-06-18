import { Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from "@nestjs/common"
import { FileFieldsInterceptor } from "@nestjs/platform-express"

import { EVENT_SUCCESS_MESSAGE } from "./event.constant"
import { EventBodyDto, EventDto } from "./event.dto"
import { EventService } from "./event.service"

@Controller("event")
export class EventController {
  constructor(private readonly service: EventService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "images", maxCount: 3 },
      { name: "files", maxCount: 3 },
      { name: "banner", maxCount: 1 }
    ])
  )
  async create(
    @UploadedFiles() files: { images?: Express.Multer.File[]; files?: Express.Multer.File[]; banner?: Express.Multer.File[] },
    @Body() payload: EventBodyDto
  ) {
    const response = await this.service.postCreate(payload, files)

    return {
      success: true,
      message: EVENT_SUCCESS_MESSAGE.SUCCESS_ON_CREATE,
      data: response
    }
  }

  @Get()
  async findAll() {
    const response = await this.service.getFindAll()
    return {
      success: true,
      message: EVENT_SUCCESS_MESSAGE.SUCCESS_ON_FIND,
      data: response
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const response = await this.service.getFindOne(id)
    return {
      success: true,
      message: EVENT_SUCCESS_MESSAGE.SUCCESS_ON_FINDONE,
      data: response
    }
  }

  @Patch(":id")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "images", maxCount: 3 },
      { name: "files", maxCount: 3 }
    ])
  )
  async update(
    @UploadedFiles() files: { images?: Express.Multer.File[]; files?: Express.Multer.File[]; banner?: Express.Multer.File[] },
    @Param("id") id: string,
    @Body() payload: EventDto
  ) {
    const updatedEvent = await this.service.patchUpdate(id, payload, files)

    return {
      success: true,
      message: "Event updated successfully",
      data: updatedEvent
    }
  }
}
