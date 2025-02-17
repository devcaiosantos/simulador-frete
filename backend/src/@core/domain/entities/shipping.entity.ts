import { Address } from "../value-objects/address.vo";
import { Dimensions } from "../value-objects/dimensions.vo";
import { v4 as uuidv4 } from "uuid";

export interface ShippingProps {
  userEmail: string;
  pickupAddress: Address;
  deliveryAddress: Address;
  dimensions: Dimensions;
  productName: string;
  cheapestOperator?: string;
  cheapestOperatorPrice?: number;
  fastestOperator?: string;
  fastestOperatorPrice?: number;
}

export class Shipping {
  private readonly _id: string;
  private _userEmail: string;
  private _pickupAddress: Address;
  private _deliveryAddress: Address;
  private _dimensions: Dimensions;
  private _productName: string;
  private _cheapestOperator?: string;
  private _cheapestOperatorPrice?: number;
  private _fastestOperator?: string;
  private _fastestOperatorPrice?: number;

  constructor(props: ShippingProps, id?: string) {
    this._id = id ?? uuidv4();
    this._userEmail = props.userEmail;
    this._pickupAddress = props.pickupAddress;
    this._deliveryAddress = props.deliveryAddress;
    this._dimensions = props.dimensions;
    this._productName = props.productName;
    this._cheapestOperator = props.cheapestOperator;
    this._cheapestOperatorPrice = props.cheapestOperatorPrice;
    this._fastestOperator = props.fastestOperator;
    this._fastestOperatorPrice = props.fastestOperatorPrice;
  }

  get id(): string {
    return this._id;
  }

  get userEmail(): string {
    return this._userEmail;
  }

  get pickupAddress(): Address {
    return this._pickupAddress;
  }

  get deliveryAddress(): Address {
    return this._deliveryAddress;
  }

  get dimensions(): Dimensions {
    return this._dimensions;
  }

  get productName(): string {
    return this._productName;
  }

  get cheapestOperator(): string | undefined {
    return this._cheapestOperator;
  }

  get cheapestOperatorPrice(): number | undefined {
    return this._cheapestOperatorPrice;
  }

  get fastestOperator(): string | undefined {
    return this._fastestOperator;
  }

  get fastestOperatorPrice(): number | undefined {
    return this._fastestOperatorPrice;
  }

  // Métodos para atualizar os operadores e preços após a simulação
  public setCheapestOperator(operator: string, price: number): void {
    this._cheapestOperator = operator;
    this._cheapestOperatorPrice = price;
  }

  public setFastestOperator(operator: string, price: number): void {
    this._fastestOperator = operator;
    this._fastestOperatorPrice = price;
  }
}
