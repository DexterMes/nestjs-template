import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { Request } from "express"

import { NotAuthorizedError } from "../errors/api-error"

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<Request>()
      const token = this.extractTokenFromHeader(request)

      if (!token) throw new NotAuthorizedError()
      const payload = this.jwtService.verify(token, { secret: this.configService.get<string>("ACCESS_TOKEN_SECRET") })

      request.user = payload.id
      return true
    } catch (error) {
      throw new UnauthorizedException("Invalid token")
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? []
    return type === "Bearer" ? token : undefined
  }
}
