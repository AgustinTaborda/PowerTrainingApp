import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class Auth0TokenGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
