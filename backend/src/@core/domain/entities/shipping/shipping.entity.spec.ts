import { GoogleMapsService } from "../../../infra/services/google-geocoding.service";
import { Shipping } from "./shipping.entity";
import { Address } from "../address.entity";

describe("Shipping Entity", () => {
  describe("Haversine test", () => {
    it("should calculate the distance between two coordinates correctly", () => {
      // São Paulo, Brasil
      const lat1 = -23.5505;
      const lon1 = -46.6333;

      // Rio de Janeiro, Brasil
      const lat2 = -22.9068;
      const lon2 = -43.1729;

      const distance = Shipping.haversine(lat1, lon1, lat2, lon2);
      expect(distance).toBe(360.74882490989955);
    });

    it("should return 0 when the coordinates are the same", () => {
      //São Paulo, Brasil
      const lat1 = -23.5505;
      const lon1 = -46.6333;

      const distance = Shipping.haversine(lat1, lon1, lat1, lon1);
      expect(distance).toBe(0);
    });
  });

  describe("deg2rad", () => {
    it("should convert 0 degrees to 0 radians", () => {
      const degrees = 0;
      const radians = Shipping.deg2rad(degrees);
      expect(radians).toBe(0);
    });

    it("should convert 180 degrees to π radians", () => {
      const degrees = 180;
      const radians = Shipping.deg2rad(degrees);
      expect(radians).toBe(Math.PI);
    });

    it("should convert 90 degrees to π/2 radians", () => {
      const degrees = 90;
      const radians = Shipping.deg2rad(degrees);
      expect(radians).toBe(Math.PI / 2);
    });
  });

  describe("env vars", () => {
    it("should throw an error if the GOOGLE_MAPS_API_KEY is not set", () => {
      const env = process.env.GOOGLE_MAPS_API_KEY;

      expect(env).toBe("AIzaSyDQMixtzRqUw5z-kNF7_hT6YaIb5OTtxt0");
    });
  });

  describe("calculateShipping", () => {
    it("should return the cheapest and fastest shipping options", async () => {
      const pickupAddress = {
        street: "Rua dos Crisântemos",
        number: 103,
        city: "Campo Mourão",
        state: "PR",
        country: "Brasil",
        zipCode: "87308170",
      };

      const deliveryAddress = {
        street: "Clodoaldo Avelino",
        number: 106,
        city: "Xique Xique",
        state: "BA",
        country: "Brasil",
        zipCode: "47400000",
      };

      const pickupAddressEntity = new Address(pickupAddress);
      const deliveryAddressEntity = new Address(deliveryAddress);

      const googleMapsService = new GoogleMapsService(
        process.env.GOOGLE_MAPS_API_KEY || "",
      );

      const pickupCoords = await googleMapsService.getLatLong(
        pickupAddressEntity.fullAddress,
      );
      const deliveryCoords = await googleMapsService.getLatLong(
        deliveryAddressEntity.fullAddress,
      );

      const shipping = new Shipping({
        userEmail: "teste@gmail.com",
        height: 15,
        width: 7,
        length: 0.8,
        productName: "Smartphone",
        pickupAddressId: pickupAddressEntity.id,
        deliveryAddressId: deliveryAddressEntity.id,
      });

      const { fastest, cheapest } = shipping.calculateShipping(
        pickupCoords,
        deliveryCoords,
        [
          {
            id: 1,
            name: "Operador Logístico 1",
            divisorWeight: 6000,
            minCost: 6,
            distanceMultiplier: [
              { minDistance: 0, multiplier: 1.2, deliveryTime: 1 },
              { minDistance: 101, multiplier: 1.6, deliveryTime: 3 },
              { minDistance: 500, multiplier: 5, deliveryTime: 4 },
            ],
          },
          {
            id: 2,
            name: "Operador Logístico 2",
            divisorWeight: 5000,
            minCost: 6,
            distanceMultiplier: [
              { minDistance: 0, multiplier: 1.0, deliveryTime: 1 },
              { minDistance: 101, multiplier: 1.8, deliveryTime: 2 },
              { minDistance: 500, multiplier: 4, deliveryTime: 5 },
            ],
          },
        ],
      );

      expect(fastest.name).toBe("Operador Logístico 1");
      expect(fastest.price).toBe(30);

      expect(cheapest.name).toBe("Operador Logístico 2");
      expect(cheapest.price).toBe(24);
    });
  });
});
