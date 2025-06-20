import { IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator"

export class TicketBodyDto {
  @IsUUID(4, { message: "eventId must be a uuid" })
  @IsNotEmpty({ message: "eventId is required" })
  eventId: string

  @IsInt({ message: "amount must be a number" })
  @IsNotEmpty({ message: "amount is required" })
  amount: number

  @IsString({ message: "contact must be a string" })
  @IsNotEmpty({ message: "contact is required" })
  contact: string
}

export class TicketDto extends TicketBodyDto {
  @IsUUID(4, { message: "userId must be a uuid" })
  @IsNotEmpty({ message: "userId is required" })
  userId: string
}
