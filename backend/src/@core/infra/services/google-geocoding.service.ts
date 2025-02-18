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

interface GoogleAutocompleteResponse {
  status: string;
  predictions: Array<{
    description: string;
    place_id: string;
  }>;
}

export class GoogleMapsService {
  constructor(private readonly apiKey: string) {}

  /**
   * Obtém a latitude e longitude a partir de um endereço.
   */
  public async getLatLong(
    address: string,
  ): Promise<{ lat: number; lng: number }> {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${this.apiKey}`;

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

  public async getAutocompleteSuggestions(
    input: string,
  ): Promise<Array<{ description: string; place_id: string }>> {
    const encodedInput = encodeURIComponent(input);
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedInput}&key=${this.apiKey}`;

    return axios
      .get<GoogleAutocompleteResponse>(url)
      .then((response) => {
        const data = response.data;
        if (data.status !== "OK") {
          throw new Error(`Autocomplete error: ${data.status}`);
        }
        return data.predictions.map((prediction) => ({
          description: prediction.description,
          place_id: prediction.place_id,
        }));
      })
      .catch((error: unknown) => {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        throw new Error(
          `Failed to fetch autocomplete suggestions: ${errorMessage}`,
        );
      });
  }
}
