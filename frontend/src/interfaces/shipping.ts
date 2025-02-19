
export interface IShipping {
    productName: string;
    dimensions: {
        height: number;
        width: number;
        length: number;
    };
    pickupAddress: {
        number: number;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    deliveryAddress: {
        number: number;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}