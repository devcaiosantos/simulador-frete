import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";

export class DimensionsDto {
  @ApiProperty({
    example: 10,
    description: "Altura do produto (cm)",
  })
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @ApiProperty({
    example: 10,
    description: "Largura do produto (cm)",
  })
  @IsNumber()
  @IsNotEmpty()
  width: number;

  @ApiProperty({
    example: 10,
    description: "Comprimento do produto (cm)",
  })
  @IsNumber()
  @IsNotEmpty()
  length: number;
}
