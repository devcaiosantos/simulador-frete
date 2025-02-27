import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FindByEmailDto {
  @ApiProperty({
    example: "john@example.com",
    description: "Email do usuário",
  })
  @IsNotEmpty()
  userEmail: string;
}
