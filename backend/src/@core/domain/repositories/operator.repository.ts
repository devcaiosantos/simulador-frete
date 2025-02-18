import { Operator } from "../entities/operator.entity";

export interface OperatorRepository {
  insert(Operator: Operator): Promise<void>;
  findById(id: string): Promise<Operator>;
}
