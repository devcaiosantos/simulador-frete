import { v4 as uuidv4 } from "uuid";

interface AddressProps {
  id?: string;
  number: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
export class Address {
  id: string;
  number: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  constructor(props: AddressProps) {
    this.id = props.id ?? uuidv4();
    this.number = props.number;
    this.street = props.street;
    this.city = props.city;
    this.state = props.state;
    this.zipCode = props.zipCode;
    this.country = props.country;
  }

  get fullAddress(): string {
    return `${this.number} ${this.street}, ${this.city}, ${this.state}, ${this.zipCode}, ${this.country}`;
  }
}
