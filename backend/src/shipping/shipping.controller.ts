import { Controller, Post, Body, Param, Get, UsePipes } from "@nestjs/common";
import { ShippingService } from "../@core/domain/services/shipping.service";
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
}
