import { ShippingRepository } from "../repositories/shipping.repository";
import { Shipping } from "../entities/shipping.entity";
import { GoogleMapsService } from "../../infra/services/google-geocoding.service";
import { Address } from "../value-objects/address.vo";
import { Dimensions } from "../value-objects/dimensions.vo";
import { ShippingResponseDto } from "../dto/shipping-response.dto";
export class ShippingService {
  constructor(
    private readonly shippingRepository: ShippingRepository,
    private readonly googleMapsService: GoogleMapsService,
  ) {}

  async calculateShipping({
    userEmail,
    pickupAddress,
    deliveryAddress,
    dimensions,
    productName,
  }: {
    userEmail: string;
    pickupAddress: Address;
    deliveryAddress: Address;
    dimensions: Dimensions;
    productName: string;
  }): Promise<ShippingResponseDto> {
    const shipping = new Shipping({
      userEmail,
      pickupAddress,
      deliveryAddress,
      dimensions,
      productName,
    });

    const pickupCoords = await this.googleMapsService.getLatLong(
      shipping.pickupAddress.fullAddress,
    );
    const deliveryCoords = await this.googleMapsService.getLatLong(
      shipping.deliveryAddress.fullAddress,
    );

    shipping.simulateShipping(pickupCoords, deliveryCoords, [
      {
        id: 1,
        name: "Operador Logístico 1",
        divisorWeight: 6000,
        minCost: 6,
        distanceMultiplier: [
          { minDistance: 0, multiplier: 1.2, deliveryTime: 1 },
          { minDistance: 101, multiplier: 1.6, deliveryTime: 3 },
          { minDistance: 500, multiplier: 5, deliveryTime: 4 },
        ],
      },
      {
        id: 2,
        name: "Operador Logístico 2",
        divisorWeight: 5000,
        minCost: 6,
        distanceMultiplier: [
          { minDistance: 0, multiplier: 1.0, deliveryTime: 1 },
          { minDistance: 101, multiplier: 1.8, deliveryTime: 2 },
          { minDistance: 500, multiplier: 4, deliveryTime: 5 },
        ],
      },
    ]);

    await this.shippingRepository.insert(shipping);
    return new ShippingResponseDto(shipping);
  }
}
