import { Address } from "../entities/address.entity";

export interface AddressRepository {
  insert(Address: Address): Promise<void>;
  findById(id: string): Promise<Address>;
}
