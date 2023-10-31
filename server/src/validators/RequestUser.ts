import { MinLength, Matches, IsNotEmpty, IsString } from "class-validator"

export class RequestUser {
  @IsString()
  @IsNotEmpty()
  email!: string

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password!: string
}
