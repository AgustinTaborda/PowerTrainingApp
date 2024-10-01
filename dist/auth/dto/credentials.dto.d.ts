import { CreateUserDto } from "src/users/dto/create-user.dto";
declare const CredentialsDto_base: import("@nestjs/common").Type<Pick<CreateUserDto, "email" | "password">>;
export declare class CredentialsDto extends CredentialsDto_base {
}
export {};
