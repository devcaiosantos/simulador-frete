import { IsString, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { AddressDto } from "./address.dto";
import { DimensionsDto } from "./dimensions.dto";
export class CreateShippingDto {
  @IsNotEmpty()
  userEmail: string;

  @ValidateNested()
  @Type(() => AddressDto)
  pickupAddress: AddressDto;

  @ValidateNested()
  @Type(() => AddressDto)
  deliveryAddress: AddressDto;

  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensions: DimensionsDto;

  @IsString()
  @IsNotEmpty()
  productName: string;
}
