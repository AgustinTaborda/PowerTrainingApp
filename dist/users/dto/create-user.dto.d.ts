import { Role } from "src/auth/roles.enum";
export declare class CreateUserDto {
    name: string;
    lastName: string;
    birthDay: Date;
    email: string;
    password: string;
    role: Role;
}
