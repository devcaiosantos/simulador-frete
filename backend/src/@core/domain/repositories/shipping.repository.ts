import { Shipping } from "../entities/shipping.entity";

export interface ShippingRepository {
  insert(Shipping: Shipping): Promise<void>;
  findOneById(id: string): Promise<Shipping>;
  findAllByUserEmail(userEmail: string): Promise<Shipping[]>;
}
