import { ShippingRepository } from "../repositories/shipping.repository";
import { Shipping } from "../entities/shipping.entity";
import axios from "axios";
interface GoogleGeocodeResponse {
  status: string;
  results: Array<{
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
}

export class ShippingService {
  constructor(
    private readonly ShippingRepository: ShippingRepository,
    private readonly googleApiKey: string,
  ) {}

  async calculateShipping(Shipping: Shipping): Promise<void> {}

  async getLatLong(address: string): Promise<{ lat: number; lng: number }> {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${this.googleApiKey}`;

    try {
      const response = await axios.get<GoogleGeocodeResponse>(url);

      if (response && response.status !== 200) {
        throw new Error(`Failed to fetch coordinates: ${response.statusText}`);
      }
      const data = response.data;

      if (data.status !== "OK") {
        throw new Error(`Geocoding error: ${data.status}`);
      }

      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } catch (error: unknown) {
      let errorMessage: string = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      throw new Error(`Failed to fetch coordinates: ${errorMessage}`);
    }
  }
}
