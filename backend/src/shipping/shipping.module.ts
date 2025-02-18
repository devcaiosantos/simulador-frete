import { Module } from "@nestjs/common";
import { ShippingController } from "./shipping.controller";
import { getDataSourceToken, TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { ShippingSchema } from "../@core/infra/db/schema/shipping.schema";
import { ShippingService } from "src/@core/domain/services/shipping.service";
import { ShippingTypeOrmRepository } from "../@core/infra/db/repository/shipping-typeorm.repository";
import { ShippingRepository } from "../@core/domain/repositories/shipping.repository";
import { GoogleMapsService } from "src/@core/infra/services/google-geocoding.service";

@Module({
  imports: [TypeOrmModule.forFeature([ShippingSchema])],
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
      provide: ShippingService,
      useFactory: (repo: ShippingRepository) => {
        const googleMapsService = new GoogleMapsService(
          "AIzaSyDQMixtzRqUw5z-kNF7_hT6YaIb5OTtxt0",
        );
        return new ShippingService(repo, googleMapsService);
      },
      inject: [ShippingTypeOrmRepository],
    },
  ],
})
export class ShippingModule {}
