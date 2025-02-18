import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("addresses")
export class AddressSchema {
  @PrimaryColumn()
  id: string;

  @Column()
  number: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @Column()
  country: string;
}
