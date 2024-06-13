import { UsersService } from './service/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './DTOs/create-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(user: CreateUserDto): Promise<any>;
}
