import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AutocompleteAddressDto {
  @ApiProperty({
    example: "87307-000",
    description: "Endereço",
  })
  @IsNotEmpty()
  address: string;
}
