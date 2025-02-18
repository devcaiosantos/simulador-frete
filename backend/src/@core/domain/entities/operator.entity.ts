import { v4 as uuidv4 } from "uuid";

interface OperatorProps {
  id?: string;
  name: string;
  price: number;
  deliveryTime: number;
}

export class Operator {
  id: string;
  name: string;
  price: number;
  deliveryTime: number;

  constructor(props: OperatorProps) {
    this.id = props.id ?? uuidv4();
    this.name = props.name;
    this.price = props.price;
    this.deliveryTime = props.deliveryTime;
  }
}
