import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateDonationDto {
  @IsString()
  @IsOptional()
  id!: string;

  @IsDate()
  @IsNotEmpty()
  date!: Date;

  @IsString()
  @IsNotEmpty()
  donorId!: string;

  @IsString()
  @IsNotEmpty()
  bloodType!: string;

  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updatedAt!: Date | null;
}
