import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class GoogleAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromRequest;
    private getGooglePublicKeys;
}
