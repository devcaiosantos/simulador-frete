import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigModuleOptions } from "@nestjs/config";
import { ShippingSchema } from "./@core/infra/db/schema/shipping.schema";
import { OperatorSchema } from "./@core/infra/db/schema/operator.schema";
import { AddressSchema } from "./@core/infra/db/schema/address.schema";
import { ShippingModule } from "./shipping/shipping.module";

const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
};

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST || "localhost",
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "password",
      database: process.env.POSTGRES_DB || "mydatabase",
      entities: [ShippingSchema, OperatorSchema, AddressSchema],
      synchronize: true,
    }),
    ShippingModule,
  ],
})
export class AppModule {}
