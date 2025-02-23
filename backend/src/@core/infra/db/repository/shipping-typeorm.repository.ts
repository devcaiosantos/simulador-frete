import { Repository } from "typeorm";
import { ShippingSchema } from "../schema/shipping.schema";
import { Shipping } from "../../../domain/entities/shipping/shipping.entity";
import { ShippingRepository } from "../../../domain/repositories/shipping.repository";

export class ShippingTypeOrmRepository implements ShippingRepository {
  constructor(private ormRepo: Repository<ShippingSchema>) {}

  async insert(shipping: Shipping): Promise<void> {
    const model = this.ormRepo.create({
      id: shipping.id,
      userEmail: shipping.userEmail,
      height: shipping.height,
      width: shipping.width,
      length: shipping.length,
      productName: shipping.productName,
      distance: shipping.distance,
      pickupAddressId: shipping.pickupAddressId,
      deliveryAddressId: shipping.deliveryAddressId,
      cheapestOperatorId: shipping.cheapestOperatorId,
      fastestOperatorId: shipping.fastestOperatorId,
    });
    await this.ormRepo.insert(model);
  }

  async findOneById(id: string): Promise<Shipping> {
    const model = await this.ormRepo.findOne({
      where: { id },
      relations: [
        "pickupAddressId",
        "deliveryAddressId",
        "cheapestOperatorId",
        "fastestOperatorId",
      ],
    });

    if (!model) {
      throw new Error("Shipping not found");
    }

    return new Shipping(model);
  }

  async findAllByUserEmail(userEmail: string): Promise<Shipping[]> {
    const shippings = await this.ormRepo.find({
      where: { userEmail },
      order: { createdAt: "DESC" },
      relations: [
        "pickupAddressId",
        "deliveryAddressId",
        "cheapestOperatorId",
        "fastestOperatorId",
      ],
    });
    return shippings.map((shipping) => new Shipping(shipping));
  }
}
