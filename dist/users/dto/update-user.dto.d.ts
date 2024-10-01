import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    name: string;
    lastName: string;
    birthDay: Date;
    email: string;
    password: string;
    isAdmin: boolean;
    subscriptionEndDate: Date;
}
export {};
