import { v4 as uuidv4 } from "uuid";

export interface ShippingProps {
  id?: string;
  userEmail: string;
  height: number;
  width: number;
  length: number;
  productName: string;
  distance?: number;
  pickupAddressId?: string;
  deliveryAddressId?: string;
  cheapestOperatorId?: string;
  fastestOperatorId?: string;
  createdAt?: Date;
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

interface OperatorResponse {
  name: string;
  price: number;
  deliveryTime: number;
}

export class Shipping {
  id: string;
  userEmail: string;
  height: number;
  width: number;
  length: number;
  productName: string;
  distance?: number;
  pickupAddressId?: string;
  deliveryAddressId?: string;
  cheapestOperatorId?: string;
  fastestOperatorId?: string;
  createdAt?: Date;

  constructor(props: ShippingProps, id?: string) {
    this.id = id ?? uuidv4();
    this.userEmail = props.userEmail;
    this.height = props.height;
    this.width = props.width;
    this.length = props.length;
    this.productName = props.productName;
    this.distance = props.distance;
    this.pickupAddressId = props.pickupAddressId;
    this.deliveryAddressId = props.deliveryAddressId;
    this.cheapestOperatorId = props.cheapestOperatorId;
    this.fastestOperatorId = props.fastestOperatorId;
    this.createdAt = props.createdAt;
  }

  /**
   * @param pickupCoords Coordenadas da coleta ({ lat, lng })
   * @param deliveryCoords Coordenadas da entrega ({ lat, lng })
   * @param operators Lista de operadores com preço por km e velocidade (km/h)
   */
  public calculateShipping(
    pickupCoords: { lat: number; lng: number },
    deliveryCoords: { lat: number; lng: number },
    operators: ShippingOperator[],
  ): {
    cheapest: OperatorResponse;
    fastest: OperatorResponse;
  } {
    const distance = Shipping.haversine(
      pickupCoords.lat,
      pickupCoords.lng,
      deliveryCoords.lat,
      deliveryCoords.lng,
    );

    let cheapest = {
      name: "",
      price: +Infinity,
      deliveryTime: 0,
    };

    let fastest = {
      name: "",
      price: 0,
      deliveryTime: +Infinity,
    };

    for (const operator of operators) {
      let costPerCubicWeight =
        (this.height * this.width * this.length) / operator.divisorWeight;

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
          name: operator.name,
          price,
          deliveryTime: distanceMultiplier.deliveryTime,
        };
      }

      if (!fastest || distanceMultiplier.deliveryTime < fastest.deliveryTime) {
        fastest = {
          name: operator.name,
          price,
          deliveryTime: distanceMultiplier.deliveryTime,
        };
      }

      this.distance = distance;
    }
    return { cheapest, fastest };
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
}
