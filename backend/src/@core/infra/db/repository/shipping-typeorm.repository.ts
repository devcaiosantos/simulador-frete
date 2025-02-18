import { Repository } from "typeorm";
import { ShippingSchema } from "../schema/shipping.schema";
import { Shipping } from "../../../domain//entities/shipping.entity";
import { ShippingRepository } from "../../../domain/repositories/shipping.repository";

export class ShippingTypeOrmRepository implements ShippingRepository {
  constructor(private ormRepo: Repository<ShippingSchema>) {}

  async insert(shipping: Shipping): Promise<void> {
    const model = this.ormRepo.create({
      id: shipping.id,
      userEmail: shipping.userEmail,
      pickupAddress: `${shipping.pickupAddress.street}, ${shipping.pickupAddress.city}, ${shipping.pickupAddress.state}, ${shipping.pickupAddress.zipCode}`,
      deliveryAddress: `${shipping.deliveryAddress.street}, ${shipping.deliveryAddress.city}, ${shipping.deliveryAddress.state}, ${shipping.deliveryAddress.zipCode}`,
      height: shipping.height,
      width: shipping.width,
      length: shipping.length,
      productName: shipping.productName,
      cheapestOperator: shipping.cheapestOperator?.name,
      cheapestOperatorPrice: shipping.cheapestOperatorPrice,
      fastestOperator: shipping.fastestOperator?.name,
      fastestOperatorPrice: shipping.fastestOperatorPrice,
    });
    await this.ormRepo.insert(model);
  }
}
