import { UsersService } from 'src/service/users.service';
import { User } from 'src/schema/user.schema';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(createUserDto: {
        username: string;
        password: string;
    }): Promise<User>;
    findOne(username: string): Promise<User>;
}
