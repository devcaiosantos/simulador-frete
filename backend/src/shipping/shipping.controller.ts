import { Controller, Post, Body, Param, Get, UsePipes } from "@nestjs/common";
import { ShippingService } from "../@core/domain/services/shipping.service";
import { GoogleMapsService } from "src/@core/infra/services/google-geocoding.service";
import { CreateShippingDto } from "./dto/create-shipping.dto";
import { FindByEmailDto } from "./dto/find-email.dto";
import { ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SimulateShippingResponseDTO } from "./dto/responses/simulate-shipping-response.dto";
import { AutocompleteAddressDto } from "./dto/autocomplete-address.dto";
import { AddressDto } from "./dto/address.dto";
@Controller("api/shipping")
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @ApiOperation({ summary: "Simular frete" })
  @ApiResponse({
    status: 200,
    description: "Simulação de frete realizada com sucesso",
    type: SimulateShippingResponseDTO,
  })
  @Post()
  @UsePipes(ValidationPipe)
  simulateShipping(@Body() createShippingDto: CreateShippingDto) {
    return this.shippingService.simulateShipping({
      userEmail: createShippingDto.userEmail,
      pickupAddress: createShippingDto.pickupAddress,
      deliveryAddress: createShippingDto.deliveryAddress,
      dimensions: createShippingDto.dimensions,
      productName: createShippingDto.productName,
    });
  }

  @ApiOperation({ summary: "Buscar simulações por email" })
  @ApiResponse({
    status: 200,
    description: "Simulações de frete encontradas com sucesso",
    type: [SimulateShippingResponseDTO],
  })
  @Get("/:userEmail")
  @UsePipes(ValidationPipe)
  findAllByUserEmail(@Param() params: FindByEmailDto) {
    return this.shippingService.findAllByUserEmail(params.userEmail);
  }

  @ApiResponse({
    status: 200,
    description: "Endereço encontrado com sucesso",
    type: AddressDto,
  })
  @Get("autocomplete-address/:address")
  async autocompleteAddress(@Param() params: AutocompleteAddressDto) {
    const googleMapsService = new GoogleMapsService(
      process.env.GOOGLE_MAPS_API_KEY || "",
    );
    return googleMapsService.getFormattedAddress(params.address);
  }
}
