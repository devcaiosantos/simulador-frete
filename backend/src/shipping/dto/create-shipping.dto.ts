import { Address } from "src/@core/domain/value-objects/address.vo";
import { Dimensions } from "src/@core/domain/value-objects/dimensions.vo";
export class CreateShippingDto {
  userEmail: string;
  pickupAddress: Address;
  deliveryAddress: Address;
  dimensions: Dimensions;
  productName: string;
}
