import { IAddress } from "./address";
import { IOperator } from "./operator";

export interface IShippingSimulation{
    id: string;
    userEmail: string;
    height: number;
    width: number;
    length: number;
    productName: string;
    distance: number;
    pickupAddressId: IAddress;
    deliveryAddressId: IAddress;
    cheapestOperatorId: IOperator;
    fastestOperatorId: IOperator;
    createdAt: Date;
}