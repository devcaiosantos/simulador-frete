import { Controller, Post, Body, Param, Get, UsePipes } from "@nestjs/common";
import { ShippingService } from "../@core/domain/services/shipping.service";
import { GoogleMapsService } from "src/@core/infra/services/google-geocoding.service";
import { CreateShippingDto } from "./dto/create-shipping.dto";
import { FindByEmailDto } from "./dto/find-email.dto";
import { ValidationPipe } from "@nestjs/common";

@Controller("api/shipping")
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post()
  @UsePipes(ValidationPipe)
  simulateShipping(@Body() createShippingDto: CreateShippingDto) {
    return this.shippingService.calculateShipping({
      userEmail: createShippingDto.userEmail,
      pickupAddress: createShippingDto.pickupAddress,
      deliveryAddress: createShippingDto.deliveryAddress,
      dimensions: createShippingDto.dimensions,
      productName: createShippingDto.productName,
    });
  }

  @Get("/:userEmail")
  @UsePipes(ValidationPipe)
  findAllByUserEmail(@Param() params: FindByEmailDto) {
    return this.shippingService.findAllByUserEmail(params.userEmail);
  }

  @Get("autocompleteAddress/:address")
  async autocompleteAddress(@Param("address") address: string) {
    const googleMapsService = new GoogleMapsService(
      process.env.GOOGLE_MAPS_API_KEY || "",
    );
    return googleMapsService.getFormattedAddress(address);
  }
}
