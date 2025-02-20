import axios from "axios";

interface GoogleGeocodeResponse {
  status: string;
  results: Array<{
    address_components: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>;
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
      location_type: string;
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
    };
    place_id: string;
    plus_code: {
      compound_code: string;
      global_code: string;
    };
    types: string[];
  }>;
}

export interface FormattedAddress {
  street: string;
  number: number;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export class GoogleMapsService {
  constructor(private readonly apiKey: string) {}

  public async getLatLong(
    address: string,
  ): Promise<{ lat: number; lng: number }> {
    const encodedAddress = encodeURIComponent(address);
    const url = `${process.env.GOOGLE_MAPS_API_KEY}${encodedAddress}&key=${this.apiKey}`;

    return axios
      .get<GoogleGeocodeResponse>(url)
      .then((response) => {
        const data = response.data;
        if (data.status !== "OK") {
          throw new Error(`Geocoding error: ${data.status}`);
        }
        const location = data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      })
      .catch((error: unknown) => {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        throw new Error(`Failed to fetch coordinates: ${errorMessage}`);
      });
  }

  public async getFormattedAddress(address: string): Promise<FormattedAddress> {
    const encodedAddress = encodeURIComponent(address);
    const url = `${process.env.GOOGLE_MAPS_API_KEY}${encodedAddress}&key=${this.apiKey}`;

    return axios
      .get<GoogleGeocodeResponse>(url)
      .then((response) => {
        const data = response.data;
        if (data.status !== "OK") {
          throw new Error(`Geocoding error: ${data.status}`);
        }

        const addressComponents = data.results[0].address_components;

        const getComponent = (types: string[]) => {
          const component = addressComponents.find((comp) =>
            comp.types.some((type) => types.includes(type)),
          );
          return component ? component.long_name : "";
        };

        const street = getComponent(["route"]);
        const number = parseInt(getComponent(["street_number"]), 10);
        const city = getComponent(["administrative_area_level_2"]);
        const state = getComponent(["administrative_area_level_1"]);
        const zipCode = getComponent(["postal_code"]);
        const country = getComponent(["country"]);

        return {
          street,
          number,
          city,
          state,
          zipCode,
          country,
        };
      })
      .catch((error: unknown) => {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        throw new Error(`Failed to fetch formatted address: ${errorMessage}`);
      });
  }
}
