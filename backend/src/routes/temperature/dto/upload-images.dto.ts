import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsPositive } from "class-validator";

export enum TempMethod {
  TANNER_HELLAND = "TH",
  MODIFIED_TH = "modifiedTH",
  MC_CAMY = "mcCamy",
}

export enum TempOrder {
  WARM_FIRST = "warmFirst",
  COOL_FIRST = "coolFirst",
}

export class ProcessImagesDto {
  @IsEnum(TempMethod)
  method: TempMethod;

  @IsEnum(TempOrder)
  order: TempOrder;

  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  minTemp?: number;

  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  maxTemp?: number;
}
