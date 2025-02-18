import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("operators")
export class OperatorSchema {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column("float")
  price: number;

  @Column("integer")
  deliveryTime: number;
}
