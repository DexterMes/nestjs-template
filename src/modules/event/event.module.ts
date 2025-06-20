import { Module } from "@nestjs/common"

import { UserRepository } from "../user/user.repository"
import { EventController } from "./event.controller"
import { EventRepository } from "./event.repository"
import { EventService } from "./event.service"

@Module({
  controllers: [EventController],
  providers: [EventService, EventRepository, UserRepository]
})
export class EventModule {}
