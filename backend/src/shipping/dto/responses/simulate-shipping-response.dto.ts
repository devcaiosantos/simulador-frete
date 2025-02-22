import { ApiProperty } from "@nestjs/swagger";
import { OperatorResponseDTO } from "./operator-response.dto";
import { AddressResponseDTO } from "./address-response.dto";

export class SimulateShippingResponseDTO {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "ID do envio",
  })
  id: string;

  @ApiProperty({ example: "user@example.com", description: "Email do usuário" })
  userEmail: string;

  @ApiProperty({ example: 10, description: "Altura do produto (cm)" })
  height: number;

  @ApiProperty({ example: 10, description: "Largura do produto (cm)" })
  width: number;

  @ApiProperty({ example: 10, description: "Comprimento do produto (cm)" })
  length: number;

  @ApiProperty({ example: "Product Name", description: "Nome do produto" })
  productName: string;

  @ApiProperty({
    example: 100,
    description: "Distância em km",
    required: false,
  })
  distance?: number;

  @ApiProperty({
    type: AddressResponseDTO,
    description: "ID do endereço de coleta",
  })
  pickupAddressId: AddressResponseDTO;

  @ApiProperty({
    type: AddressResponseDTO,
    description: "ID do endereço de entrega!!",
  })
  deliveryAddressId: AddressResponseDTO;

  @ApiProperty({
    type: OperatorResponseDTO,
    description: "Operador mais barato",
  })
  cheapestOperatorId: OperatorResponseDTO;

  @ApiProperty({
    type: OperatorResponseDTO,
    description: "Operador mais rápido",
  })
  fastestOperatorId: OperatorResponseDTO;

  @ApiProperty({
    example: "2023-10-01T12:00:00Z",
    description: "Data de criação",
    required: false,
  })
  createdAt?: Date;
}
