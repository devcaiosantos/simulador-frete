import { ShippingRepository } from "../repositories/shipping.repository";
import { Shipping } from "../entities/shipping.entity";
import { GoogleMapsService } from "../../infra/services/google-geocoding.service";
import { Dimensions as DimensionsVO } from "../value-objects/dimensions.vo";
import { Address as AddressVO } from "../value-objects/address.vo";
import { Operator } from "../entities/operator.entity";
import { OperatorRepository } from "../repositories/operator.repository";
import { Address } from "../entities/address.entity";
import { AddressRepository } from "../repositories/address.repository";
export class ShippingService {
  constructor(
    private readonly shippingRepository: ShippingRepository,
    private readonly operatorRepository: OperatorRepository,
    private readonly addressRepository: AddressRepository,
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
    pickupAddress: AddressVO;
    deliveryAddress: AddressVO;
    dimensions: DimensionsVO;
    productName: string;
  }): Promise<Shipping> {
    const pickupAddressEntity = new Address(pickupAddress);
    const deliveryAddressEntity = new Address(deliveryAddress);

    const pickupCoords = await this.googleMapsService.getLatLong(
      pickupAddressEntity.fullAddress,
    );
    const deliveryCoords = await this.googleMapsService.getLatLong(
      deliveryAddressEntity.fullAddress,
    );

    const shipping = new Shipping({
      userEmail: userEmail,
      height: dimensions.height,
      width: dimensions.width,
      length: dimensions.length,
      productName: productName,
      pickupAddressId: pickupAddressEntity.id,
      deliveryAddressId: deliveryAddressEntity.id,
    });

    const { fastest, cheapest } = shipping.simulateShipping(
      pickupCoords,
      deliveryCoords,
      [
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
      ],
    );

    const cheapestOperator = new Operator(cheapest);
    const fastestOperator = new Operator(fastest);

    await this.addressRepository.insert(pickupAddressEntity);
    await this.addressRepository.insert(deliveryAddressEntity);
    await this.operatorRepository.insert(cheapestOperator);
    await this.operatorRepository.insert(fastestOperator);

    shipping.cheapestOperatorId = cheapestOperator.id;
    shipping.fastestOperatorId = fastestOperator.id;

    await this.shippingRepository.insert(shipping);
    return this.shippingRepository.findOneById(shipping.id);
  }

  async findAllByUserEmail(userEmail: string): Promise<Shipping[]> {
    const shippings =
      await this.shippingRepository.findAllByUserEmail(userEmail);
    return shippings;
  }
}
