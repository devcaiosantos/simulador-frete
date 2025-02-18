import { Module } from "@nestjs/common";
import { ShippingController } from "./shipping.controller";
import { ShippingService } from "src/@core/domain/services/shipping.service";

import { getDataSourceToken, TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { ShippingSchema } from "../@core/infra/db/schema/shipping.schema";
import { ShippingTypeOrmRepository } from "../@core/infra/db/repository/shipping-typeorm.repository";
import { ShippingRepository } from "../@core/domain/repositories/shipping.repository";

import { OperatorSchema } from "src/@core/infra/db/schema/operator.schema";
import { OperatorTypeOrmRepository } from "src/@core/infra/db/repository/operator-typeorm.repository";
import { OperatorRepository } from "src/@core/domain/repositories/operator.repository";

import { AddressSchema } from "src/@core/infra/db/schema/address.schema";
import { AddressTypeOrmRepository } from "src/@core/infra/db/repository/address-typeorm.repository";
import { AddressRepository } from "src/@core/domain/repositories/address.repository";

import { GoogleMapsService } from "src/@core/infra/services/google-geocoding.service";
@Module({
  imports: [
    TypeOrmModule.forFeature([ShippingSchema, OperatorSchema, AddressSchema]),
  ],
  controllers: [ShippingController],
  providers: [
    ShippingService,
    {
      provide: ShippingTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new ShippingTypeOrmRepository(
          dataSource.getRepository(ShippingSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: OperatorTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new OperatorTypeOrmRepository(
          dataSource.getRepository(OperatorSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: AddressTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new AddressTypeOrmRepository(
          dataSource.getRepository(AddressSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: ShippingService,
      useFactory: (
        shippingRepo: ShippingRepository,
        operatorRepo: OperatorRepository,
        addressRepo: AddressRepository,
      ) => {
        const googleMapsService = new GoogleMapsService(
          process.env.GOOGLE_MAPS_API_KEY || "",
        );
        return new ShippingService(
          shippingRepo,
          operatorRepo,
          addressRepo,
          googleMapsService,
        );
      },
      inject: [
        ShippingTypeOrmRepository,
        OperatorTypeOrmRepository,
        AddressTypeOrmRepository,
      ],
    },
  ],
})
export class ShippingModule {}
