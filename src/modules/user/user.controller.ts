import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { Request } from "express"

import { UserGuard } from "../../guards/user.guard"
import { USER_SUCCESS_MESSAGE } from "./user.constant"
import { UserBodyDto } from "./user.dto"
import { UserService } from "./user.service"

@Controller("user")
@UseGuards(UserGuard)
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async profile(@Req() req: Request) {
    const user = await this.service.getProfile(req.user)
    return {
      success: true,
      message: USER_SUCCESS_MESSAGE.SUCCESS_ON_GET_PROFILE,
      data: user
    }
  }

  @Patch()
  @UseInterceptors(FileInterceptor("avatar"))
  async update(@Req() req: Request, @Body() payload: UserBodyDto, @UploadedFile() avatar?: Express.Multer.File) {
    const updatedUser = await this.service.update(req.user, payload, avatar)
    return {
      success: true,
      message: USER_SUCCESS_MESSAGE.SUCCESS_ON_UPDATE_PROFILE,
      data: updatedUser
    }
  }
}
