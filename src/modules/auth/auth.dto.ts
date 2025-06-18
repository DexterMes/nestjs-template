import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class LoginDto {
  @IsNotEmpty({ message: "email is required" })
  @IsEmail()
  email: string

  @IsNotEmpty({ message: "password is required" })
  @IsString()
  password: string
}

export class RegisterDto {
  @IsNotEmpty({ message: "firstName is required" })
  @IsString()
  firstName: string

  @IsNotEmpty({ message: "lastName is required" })
  @IsString()
  lastName: string

  @IsNotEmpty({ message: "email is required" })
  @IsString()
  email: string

  @IsNotEmpty({ message: "password is required" })
  @IsString()
  password: string

  @IsNotEmpty({ message: "contact is required" })
  @IsString()
  contact: string

  @IsNotEmpty({ message: "batch is required" })
  @IsNumber()
  batch: number

  @IsNotEmpty({ message: "department is required" })
  @IsString()
  department: string

  @IsNotEmpty({ message: "semester is required" })
  @IsNumber()
  semester: number
}

export class RefreshDto {
  @IsNotEmpty({ message: "firstName is required" })
  @IsString()
  refreshToken: string
}
