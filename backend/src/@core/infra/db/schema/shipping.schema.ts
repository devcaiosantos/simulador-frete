import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("shippings")
export class ShippingSchema {
  @PrimaryColumn()
  id: string;

  @Column()
  userEmail: string;

  @Column()
  pickupAddress: string;

  @Column()
  deliveryAddress: string;

  @Column("float")
  height: number;

  @Column("float")
  width: number;

  @Column("float")
  length: number;

  @Column()
  productName: string;

  @Column({ nullable: true })
  cheapestOperator?: string;

  @Column({ nullable: true, type: "float" })
  cheapestOperatorPrice?: number;

  @Column({ nullable: true })
  fastestOperator?: string;

  @Column({ nullable: true, type: "float" })
  fastestOperatorPrice?: number;
}
