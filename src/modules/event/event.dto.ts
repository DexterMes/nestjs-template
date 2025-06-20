import { IsArray, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from "class-validator"

export class EventBodyDto {
  @IsString({ message: "title must be a string" })
  @IsNotEmpty({ message: "title is required" })
  title: string

  @IsString({ message: "description must be a string" })
  @IsNotEmpty({ message: "description is required" })
  description: string

  @IsString({ message: "contact must be a string" })
  @IsNotEmpty({ message: "contact is required" })
  contact: string

  @IsDateString({}, { message: "date must be a valid ISO date string" })
  @IsNotEmpty({ message: "date is required" })
  date: string

  @IsString({ message: "venue must be a string" })
  @IsNotEmpty({ message: "venue is required" })
  venue: string

  @IsString({ message: "timeSlot must be a string" })
  @IsNotEmpty({ message: "timeSlot is required" })
  @Matches(/^([01]\d|2[0-3]):[0-5]\d-([01]\d|2[0-3]):[0-5]\d$/, { message: 'timeSlot must be in 24-hour format "HH:MM-HH:MM"' })
  timeSlot: string

  @IsString({ message: "category must be a string" })
  @IsNotEmpty({ message: "category is required" })
  category: string

  @IsOptional()
  @IsInt({ message: "capacity must be an integer" })
  capacity?: number

  @IsOptional()
  @IsString({ message: "department must be a string" })
  department?: string

  @IsOptional()
  @IsString({ message: "club must be a string" })
  club?: string
}

export class EventDto extends EventBodyDto {
  @IsString({ message: "banner must be a string" })
  @IsNotEmpty({ message: "banner is required" })
  banner: string

  @IsString({ message: "creatorId must be a string" })
  @IsNotEmpty({ message: "creatorId is required" })
  creatorId: string

  @IsOptional()
  @IsArray({ message: "images must be an array of strings" })
  @IsString({ each: true, message: "each value in images must be a string" })
  images?: string[]

  @IsOptional()
  @IsArray({ message: "files must be an array of strings" })
  @IsString({ each: true, message: "each value in files must be a string" })
  files?: string[]
}
