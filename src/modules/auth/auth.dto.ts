import { IsNotEmpty } from "class-validator"

export class LoginDto {
  @IsNotEmpty({ message: "email is required" })
  email: string

  @IsNotEmpty({ message: "password is required" })
  password: string
}

export class RegisterDto {
  @IsNotEmpty({ message: "firstName is required" })
  firstName: string

  @IsNotEmpty({ message: "lastName is required" })
  lastName: string

  @IsNotEmpty({ message: "email is required" })
  email: string

  @IsNotEmpty({ message: "password is required" })
  password: string
}

export class RefreshDto {
  @IsNotEmpty({ message: "firstName is required" })
  refreshToken: string
}
