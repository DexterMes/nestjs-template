import { Body, Controller, Post } from "@nestjs/common"

import { USER_SUCCESS_MESSAGE } from "./auth.constant"
import { LoginDto, RefreshDto, RegisterDto } from "./auth.dto"
import { AuthService } from "./auth.service"
import { loginDocs, refreshDocs, registerDocs } from "./auth.swagger"

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @loginDocs.operation
  @loginDocs.body
  @loginDocs.responses.success
  @loginDocs.responses.badRequest
  @Post("/login")
  async login(@Body() payload: LoginDto) {
    const response = await this.service.postLogin(payload)
    return {
      success: true,
      message: USER_SUCCESS_MESSAGE.SUCCESS_ON_LOGIN,
      data: response
    }
  }

  @registerDocs.operation
  @registerDocs.body
  @registerDocs.responses.success
  @registerDocs.responses.badRequest
  @Post("/register")
  async register(@Body() payload: RegisterDto) {
    const response = await this.service.postRegister(payload)
    return {
      success: true,
      message: USER_SUCCESS_MESSAGE.SUCCESS_ON_REGISTRATION,
      data: response
    }
  }

  @refreshDocs.operation
  @refreshDocs.body
  @refreshDocs.responses.success
  @refreshDocs.responses.badRequest
  @Post("/refresh")
  async refresh(@Body() payload: RefreshDto) {
    const response = await this.service.refreshTokens(payload)
    return {
      success: true,
      message: USER_SUCCESS_MESSAGE.TOKEN_REFRESH,
      data: response
    }
  }
}
