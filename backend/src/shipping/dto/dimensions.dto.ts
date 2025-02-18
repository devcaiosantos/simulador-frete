import { IsNumber, IsNotEmpty } from "class-validator";

export class DimensionsDto {
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @IsNotEmpty()
  length: number;
}
