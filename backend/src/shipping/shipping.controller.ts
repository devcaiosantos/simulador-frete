import { Controller, Post, Body, Param, Get } from "@nestjs/common";
import { ShippingService } from "../@core/domain/services/shipping.service";
import { CreateShippingDto } from "./dto/create-shipping.dto";

@Controller("api/shipping")
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post()
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
  findAllByUserEmail(@Param("userEmail") userEmail: string) {
    return this.shippingService.findAllByUserEmail(userEmail);
  }
}
