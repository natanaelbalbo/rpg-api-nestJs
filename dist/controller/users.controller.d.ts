import { UsersService } from 'src/service/users.service';
import { CreateUserDto } from 'src/DTOs/create-user.dto';
import { User } from 'src/schema/user.schema';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    update(id: string, updateUserDto: Partial<CreateUserDto>): Promise<User>;
    remove(id: string): Promise<User>;
}
