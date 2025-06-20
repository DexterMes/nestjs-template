import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator"

export class UserBodyDto {
  @IsString({ message: "firstName must be a string" })
  @IsNotEmpty({ message: "firstName is required" })
  firstName: string

  @IsString({ message: "lastName must be a string" })
  @IsNotEmpty({ message: "lastName is required" })
  lastName: string

  @IsString({ message: "contact must be a string" })
  @IsNotEmpty({ message: "contact is required" })
  contact: string

  @Type(() => Number)
  @IsInt({ message: "batch must be a number" })
  @Min(1, { message: "batch must be at least 1" })
  batch: number

  @IsString({ message: "department must be a string" })
  @IsNotEmpty({ message: "department is required" })
  department: string

  @Type(() => Number)
  @IsInt({ message: "semester must be a number" })
  @Min(1, { message: "semester must be at least 1" })
  @Max(12, { message: "semester cannot exceed 12" })
  semester: number
}

export class UserDto extends UserBodyDto {
  avatarURL: string | null
}
