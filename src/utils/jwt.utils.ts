import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import * as jwt from "jsonwebtoken"

export interface TokenPayloadUser {
  id: string
  email: string
}

export const getJwtConfig = (configService: ConfigService) => {
  return {
    ACCESS_TOKEN_SECRET: configService.get<string>("ACCESS_TOKEN_SECRET"),
    ACCESS_TOKEN_EXPIRES: configService.get<string>("ACCESS_TOKEN_EXPIRES"),
    REFRESH_TOKEN_SECRET: configService.get<string>("REFRESH_TOKEN_SECRET"),
    REFRESH_TOKEN_EXPIRES: configService.get<string>("REFRESH_TOKEN_EXPIRES")
  }
}

export const generateTokensUser = (user: TokenPayloadUser, configService: ConfigService, jwtService: JwtService) => {
  const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES } = getJwtConfig(configService)

  const accessToken = jwtService.sign(user, {
    algorithm: "HS256",
    secret: ACCESS_TOKEN_SECRET,
    expiresIn: ACCESS_TOKEN_EXPIRES
  })

  const refreshToken = jwtService.sign(user, {
    algorithm: "HS256",
    secret: REFRESH_TOKEN_SECRET,
    expiresIn: REFRESH_TOKEN_EXPIRES
  })

  return { accessToken, refreshToken }
}

export const verifyAccessTokenUser = (token: string, configService: ConfigService, jwtService: JwtService): string | jwt.JwtPayload => {
  const { ACCESS_TOKEN_SECRET } = getJwtConfig(configService)
  return jwtService.verify(token, { secret: ACCESS_TOKEN_SECRET })
}

export const verifyRefreshTokenUser = (token: string, configService: ConfigService, jwtService: JwtService): string | jwt.JwtPayload => {
  const { REFRESH_TOKEN_SECRET } = getJwtConfig(configService)
  return jwtService.verify(token, { secret: REFRESH_TOKEN_SECRET })
}
