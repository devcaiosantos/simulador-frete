import { OperatorRepository } from "src/@core/domain/repositories/operator.repository";
import { Repository } from "typeorm";
import { OperatorSchema } from "../schema/operator.schema";
import { Operator } from "src/@core/domain/entities/operator.entity";

export class OperatorTypeOrmRepository implements OperatorRepository {
  constructor(private ormRepo: Repository<OperatorSchema>) {}

  async insert(operator: Operator): Promise<void> {
    const model = this.ormRepo.create(operator);
    await this.ormRepo.insert(model);
  }

  async findById(id: string): Promise<Operator> {
    const model = await this.ormRepo.findOneBy({
      id: id,
    });
    if (!model) {
      throw new Error("Operator not found");
    }
    return new Operator(model);
  }
}
