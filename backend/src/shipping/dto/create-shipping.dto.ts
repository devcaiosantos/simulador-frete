import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { AddressDto } from "./address.dto";
import { DimensionsDto } from "./dimensions.dto";

export class CreateShippingDto {
  @ApiProperty({
    example: "user@example.com",
    description: "Email do usuário",
  })
  @IsNotEmpty()
  @IsString()
  userEmail: string;

  @ApiProperty({
    type: AddressDto,
    description: "Endereço de coleta",
  })
  @ValidateNested()
  @Type(() => AddressDto)
  pickupAddress: AddressDto;

  @ApiProperty({
    type: AddressDto,
    description: "Endereço de entrega",
  })
  @ValidateNested()
  @Type(() => AddressDto)
  deliveryAddress: AddressDto;

  @ApiProperty({
    type: DimensionsDto,
    description: "Dimensões do produto",
  })
  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensions: DimensionsDto;

  @ApiProperty({
    example: "Produto X",
    description: "Nome do produto",
  })
  @IsString()
  @IsNotEmpty()
  productName: string;
}
