import { IsNotEmpty } from "class-validator";

export class FindByEmailDto {
  @IsNotEmpty()
  userEmail: string;
}
