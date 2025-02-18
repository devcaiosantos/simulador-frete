import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { AddressSchema } from "./address.schema";
import { OperatorSchema } from "./operator.schema";
@Entity("shippings")
export class ShippingSchema {
  @PrimaryColumn()
  id: string;

  @Column()
  userEmail: string;

  @Column("float")
  height: number;

  @Column("float")
  width: number;

  @Column("float")
  length: number;

  @Column()
  productName: string;

  @Column("float")
  distance: number;

  @OneToOne(() => OperatorSchema)
  @JoinColumn({ name: "cheapestOperatorId" })
  cheapestOperatorId: string;

  @OneToOne(() => OperatorSchema)
  @JoinColumn({ name: "fastestOperatorId" })
  fastestOperatorId: string;

  @OneToOne(() => AddressSchema)
  @JoinColumn({ name: "pickupAddressId" })
  pickupAddressId: string;

  @OneToOne(() => AddressSchema)
  @JoinColumn({ name: "deliveryAddressId" })
  deliveryAddressId: string;
}
