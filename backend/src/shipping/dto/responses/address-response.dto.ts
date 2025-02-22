import { ApiProperty } from "@nestjs/swagger";

export class AddressResponseDTO {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "ID do endereço",
    required: false,
  })
  id?: string;

  @ApiProperty({ example: 123, description: "Número do endereço" })
  number: number;

  @ApiProperty({ example: "Rua das Flores", description: "Nome da rua" })
  street: string;

  @ApiProperty({ example: "São Paulo", description: "Cidade" })
  city: string;

  @ApiProperty({ example: "SP", description: "Estado" })
  state: string;

  @ApiProperty({ example: "01234-567", description: "CEP" })
  zipCode: string;

  @ApiProperty({ example: "Brasil", description: "País" })
  country: string;
}
