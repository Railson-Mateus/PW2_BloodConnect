import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsOptional()
  id!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  bloodType!: string;

  @IsString()
  @IsOptional()
  gender!: string | null;

  @IsString()
  @IsOptional()
  photo!: string | null;

  @IsDate()
  @IsNotEmpty()
  dateOfBirth!: Date;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsBoolean()
  @IsOptional()
  isAdmin!: boolean;

  @IsBoolean()
  @IsNotEmpty()
  termsOfUseAccepted!: boolean;

  @IsBoolean()
  @IsNotEmpty()
  privacyPolicy!: boolean;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updatedAt!: Date | null;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  id!: string;

  @IsEmail()
  @IsOptional()
  email!: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password!: string;

  @IsString()
  @IsOptional()
  fullName!: string;

  @IsString()
  @IsOptional()
  bloodType!: string;

  @IsString()
  @IsOptional()
  gender!: string | null;

  @IsString()
  @IsOptional()
  photo!: string | null;

  @IsDate()
  @IsOptional()
  dateOfBirth!: Date;

  @IsString()
  @IsOptional()
  phone!: string;

  @IsBoolean()
  @IsOptional()
  isAdmin!: boolean;

  @IsBoolean()
  @IsOptional()
  termsOfUseAccepted!: boolean;

  @IsBoolean()
  @IsOptional()
  privacyPolicy!: boolean;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updatedAt!: Date | null;
}
