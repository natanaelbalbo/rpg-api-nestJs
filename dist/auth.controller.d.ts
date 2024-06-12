import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    private configService;
    private oauth2Client;
    constructor(authService: AuthService, configService: ConfigService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    register(createUserDto: any): Promise<any>;
    googleAuth(res: Response): Promise<void>;
    googleAuthCallback(code: string, res: Response): Promise<void>;
}
