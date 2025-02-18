import { Address } from "../value-objects/address.vo";
import { Dimensions } from "../value-objects/dimensions.vo";
import { v4 as uuidv4 } from "uuid";

export interface ShippingProps {
  userEmail: string;
  pickupAddress: Address;
  deliveryAddress: Address;
  dimensions: Dimensions;
  productName: string;
  cheapestOperator?: ShippingOperator;
  cheapestOperatorPrice?: number;
  fastestOperator?: ShippingOperator;
  fastestOperatorPrice?: number;
}

export interface ShippingOperator {
  id: number;
  name: string;
  divisorWeight: number;
  minCost: number;
  distanceMultiplier: DistanceMultiplier[];
}

export interface DistanceMultiplier {
  minDistance: number;
  multiplier: number;
  deliveryTime: number;
}

export class Shipping {
  private readonly _id: string;
  private _userEmail: string;
  private _pickupAddress: Address;
  private _deliveryAddress: Address;
  private _dimensions: Dimensions;
  private _productName: string;
  private _distance?: number;
  private _cheapestOperator?: ShippingOperator;
  private _cheapestOperatorPrice?: number;
  private _fastestOperator?: ShippingOperator;
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

  /**
   * @param pickupCoords Coordenadas da coleta ({ lat, lng })
   * @param deliveryCoords Coordenadas da entrega ({ lat, lng })
   * @param operators Lista de operadores com preço por km e velocidade (km/h)
   */
  public simulateShipping(
    pickupCoords: { lat: number; lng: number },
    deliveryCoords: { lat: number; lng: number },
    operators: ShippingOperator[],
  ): void {
    const distance = Shipping.haversine(
      pickupCoords.lat,
      pickupCoords.lng,
      deliveryCoords.lat,
      deliveryCoords.lng,
    );

    let cheapest: {
      operator: ShippingOperator;
      price: number;
      deliveryTime: number;
    } | null = null;
    let fastest: {
      operator: ShippingOperator;
      price: number;
      deliveryTime: number;
    } | null = null;

    for (const operator of operators) {
      let costPerCubicWeight =
        (this._dimensions.height *
          this._dimensions.width *
          this._dimensions.length) /
        operator.divisorWeight;

      costPerCubicWeight = Math.max(costPerCubicWeight, operator.minCost);

      const distanceMultiplier = operator.distanceMultiplier
        .sort((a, b) => b.minDistance - a.minDistance)
        .find((dm) => dm.minDistance <= distance);

      if (!distanceMultiplier) {
        throw new Error(
          `No distance multiplier found for operator ${operator.name}`,
        );
      }

      const price = Number(
        Math.ceil(costPerCubicWeight * distanceMultiplier.multiplier).toFixed(
          2,
        ),
      );

      if (!cheapest || price < cheapest.price) {
        cheapest = {
          operator,
          price,
          deliveryTime: distanceMultiplier.deliveryTime,
        };
      }

      if (!fastest || distanceMultiplier.deliveryTime < fastest.deliveryTime) {
        fastest = {
          operator,
          price,
          deliveryTime: distanceMultiplier.deliveryTime,
        };
      }

      this._distance = distance;
      this._cheapestOperator = cheapest.operator;
      this._cheapestOperatorPrice = cheapest.price;
      this._fastestOperator = fastest.operator;
      this._fastestOperatorPrice = fastest.price;
    }
  }

  private static haversine(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371;
    const dLat = Shipping.deg2rad(lat2 - lat1);
    const dLon = Shipping.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(Shipping.deg2rad(lat1)) *
        Math.cos(Shipping.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private static deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  get id(): string {
    return this._id;
  }

  get userEmail(): string {
    return this._userEmail;
  }

  get height(): number {
    return this._dimensions.height;
  }

  get width(): number {
    return this._dimensions.width;
  }

  get length(): number {
    return this._dimensions.length;
  }

  get productName(): string {
    return this._productName;
  }

  get distance(): number | undefined {
    return this._distance;
  }

  get cheapestOperator(): ShippingOperator | undefined {
    return this._cheapestOperator;
  }

  get cheapestOperatorPrice(): number | undefined {
    return this._cheapestOperatorPrice;
  }

  get fastestOperator(): ShippingOperator | undefined {
    return this._fastestOperator;
  }

  get fastestOperatorPrice(): number | undefined {
    return this._fastestOperatorPrice;
  }

  get pickupAddress(): Address {
    return new Address(
      this._pickupAddress.number,
      this._pickupAddress.street,
      this._pickupAddress.city,
      this._pickupAddress.state,
      this._pickupAddress.zipCode,
      this._pickupAddress.country,
    );
  }

  get deliveryAddress(): Address {
    return new Address(
      this._deliveryAddress.number,
      this._deliveryAddress.street,
      this._deliveryAddress.city,
      this._deliveryAddress.state,
      this._deliveryAddress.zipCode,
      this._deliveryAddress.country,
    );
  }
}
