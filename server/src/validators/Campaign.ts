import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCampaignDto {
  @IsString()
  @IsOptional()
  id!: string;

  @IsString()
  @IsOptional()
  title!: string;

  @IsString()
  @IsOptional()
  image!: string;

  @IsString()
  @IsOptional()
  description!: string;

  @IsString()
  @IsOptional()
  local!: string;

  @IsDate()
  @IsOptional()
  startDate!: Date;

  @IsDate()
  @IsOptional()
  endDate!: Date;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updatedAt!: Date | null;
}

export class UpdateCampaignDto {
  @IsString()
  @IsOptional()
  id!: string;

  @IsString()
  @IsOptional()
  title!: string;

  @IsString()
  @IsOptional()
  image!: string;

  @IsString()
  @IsOptional()
  description!: string;

  @IsString()
  @IsOptional()
  local!: string;

  @IsDate()
  @IsOptional()
  startDate!: Date;

  @IsDate()
  @IsOptional()
  endDate!: Date;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updatedAt!: Date | null;
}
