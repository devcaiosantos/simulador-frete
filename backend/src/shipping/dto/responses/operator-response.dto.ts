import { ApiProperty } from "@nestjs/swagger";

export class OperatorResponseDTO {
  @ApiProperty({ example: "Operator A", description: "Nome do operador" })
  name: string;

  @ApiProperty({ example: 50.0, description: "Preço do frete" })
  price: number;

  @ApiProperty({ example: 24, description: "Tempo de entrega em horas" })
  deliveryTime: number;
}
