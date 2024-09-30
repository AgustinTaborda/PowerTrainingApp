import { PickType } from "@nestjs/swagger"
import { CreateUserDto } from "src/users/dto/create-user.dto"

export class CredentialsDto extends PickType(CreateUserDto,["email", "password"]) {
}