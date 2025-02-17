import { Shipping } from "../entities/shipping.entity";

export interface ShippingRepository {
  insert(Shipping: Shipping): Promise<void>;
  update(Shipping: Shipping): Promise<void>;
  findByUserEmail(accountNumber: string): Promise<Shipping>;
}
