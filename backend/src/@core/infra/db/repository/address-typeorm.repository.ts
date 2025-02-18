import { AddressRepository } from "src/@core/domain/repositories/address.repository";
import { Repository } from "typeorm";
import { AddressSchema } from "../schema/address.schema";
import { Address } from "src/@core/domain/entities/address.entity";

export class AddressTypeOrmRepository implements AddressRepository {
  constructor(private ormRepo: Repository<AddressSchema>) {}
  async insert(address: Address): Promise<void> {
    const model = this.ormRepo.create(address);
    await this.ormRepo.insert(model);
  }

  async findById(id: string): Promise<Address> {
    const model = await this.ormRepo.findOneBy({
      id: id,
    });
    if (!model) {
      throw new Error("Address not found");
    }
    return new Address(model);
  }
}
