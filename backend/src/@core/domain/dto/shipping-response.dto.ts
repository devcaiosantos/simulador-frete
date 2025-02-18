import { Shipping } from "../entities/shipping.entity";

export class ShippingResponseDto {
  id: string;
  userEmail: string;
  pickupAddress: string;
  deliveryAddress: string;
  productName: string;
  distance: number;
  dimensions: { height: number; width: number; length: number };
  cheapestOperator?: { id: number; name: string; price: number };
  fastestOperator?: { id: number; name: string; price: number };

  constructor(shipping: Shipping) {
    this.id = shipping.id;
    this.userEmail = shipping.userEmail;
    this.pickupAddress = shipping.pickupAddress.fullAddress;
    this.deliveryAddress = shipping.deliveryAddress.fullAddress;
    this.productName = shipping.productName;
    this.distance = shipping.distance!;
    this.cheapestOperator = shipping.cheapestOperator
      ? {
          id: shipping.cheapestOperator.id,
          name: shipping.cheapestOperator.name,
          price: shipping.cheapestOperatorPrice!,
        }
      : undefined;
    this.fastestOperator = shipping.fastestOperator
      ? {
          id: shipping.fastestOperator.id,
          name: shipping.fastestOperator.name,
          price: shipping.fastestOperatorPrice!,
        }
      : undefined;
  }
}
