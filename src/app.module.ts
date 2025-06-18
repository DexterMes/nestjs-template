import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"
import { ThrottlerModule } from "@nestjs/throttler"

import { CloudinaryModule } from "./cloudinary/cloudinary.module"
import { validate } from "./env.validation"
import { AuthModule } from "./modules/auth/auth.module"
import { EventModule } from "./modules/event/event.module"
import { PrismaModule } from "./prisma/prisma.module"

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({ secret: config.get("jwtConfig").ACCESS_TOKEN_SECRET }),
      global: true,
      inject: [ConfigService]
    }),
    PrismaModule,
    CloudinaryModule,
    AuthModule,
    EventModule
  ]
})
export class AppModule {}
