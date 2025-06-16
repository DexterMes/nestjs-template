import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { BadRequestError } from "src/errors/api-error"
import { compareHashPassword, createHashPassword } from "src/utils/bcrypt.utils"
import { generateTokensUser, verifyRefreshTokenUser } from "src/utils/jwt.utils"

import { USER_ERROR_MESSAGE, USER_SUCCESS_MESSAGE } from "./auth.constant"
import { LoginDto, RefreshDto, RegisterDto } from "./auth.dto"
import { AuthRepository } from "./auth.repository"

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async postLogin(payload: LoginDto) {
    const record = await this.repository.findUserByEmail(payload.email)
    if (!record) throw new BadRequestError(USER_ERROR_MESSAGE.ERROR_ON_LOGIN)

    const isMatch = await compareHashPassword(payload.password, record.password)
    if (!isMatch) throw new BadRequestError(USER_ERROR_MESSAGE.ERROR_ON_LOGIN)

    const { accessToken, refreshToken } = generateTokensUser({ id: record.id, email: record.email }, this.configService, this.jwtService)
    const { password, ...safeUser } = record

    return { ...safeUser, accessToken, refreshToken }
  }

  async postRegister(payload: RegisterDto) {
    const record = await this.repository.findUserByEmail(payload.email)
    if (record) throw new BadRequestError(USER_ERROR_MESSAGE.ERROR_ON_LOGIN)

    const hashPassword = await createHashPassword(payload.password)
    const user = await this.repository.createUser({ ...payload, password: hashPassword })

    const { accessToken, refreshToken } = generateTokensUser({ id: user.id, email: user.email }, this.configService, this.jwtService)
    const { password, ...safeUser } = user

    return { ...safeUser, accessToken, refreshToken }
  }

  async refreshTokens(payload: RefreshDto) {
    const decoded = verifyRefreshTokenUser(payload.refreshToken, this.configService, this.jwtService)

    const user = await this.repository.findUserByEmail(decoded.email)
    if (!user) throw new BadRequestError(USER_ERROR_MESSAGE.USER_NOT_FOUND)

    const { accessToken, refreshToken } = generateTokensUser({ id: user.id, email: user.email }, this.configService, this.jwtService)
    const { password, ...safeUser } = user

    return { ...safeUser, accessToken, refreshToken }
  }
}
