import { IsArray, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator"

export class EventBodyDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  contact: string

  @IsDateString()
  @IsNotEmpty()
  date: string

  @IsString()
  @IsNotEmpty()
  venue: string

  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d-([01]\d|2[0-3]):[0-5]\d$/, { message: 'timeSlot must be in 24-hour format "HH:MM-HH:MM"' })
  timeSlot: string

  @IsString()
  @IsNotEmpty()
  category: string

  @IsOptional()
  @IsInt()
  capacity?: number

  @IsOptional()
  @IsString()
  department?: string

  @IsOptional()
  @IsString()
  club?: string
}

export class EventDto extends EventBodyDto {
  @IsString()
  @IsNotEmpty()
  banner: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  files?: string[]
}
