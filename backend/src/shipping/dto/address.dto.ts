import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsNotEmpty } from "class-validator";

export class AddressDto {
  @ApiProperty({
    example: 123,
    description: "Número do endereço",
  })
  @IsNumber()
  @IsNotEmpty()
  number: number;

  @ApiProperty({
    example: "Rua das Flores",
    description: "Nome da rua",
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    example: "São Paulo",
    description: "Cidade",
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: "SP",
    description: "Estado",
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    example: "01234-567",
    description: "CEP",
  })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({
    example: "Brasil",
    description: "País",
  })
  @IsString()
  @IsNotEmpty()
  country: string;
}
