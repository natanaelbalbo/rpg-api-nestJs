import { Injectable } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDocument } from './schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any): Promise<any> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.usersService.create(user.username, hashedPassword);
    return {
      access_token: this.jwtService.sign({ username: newUser.username, sub: newUser._id }),
    };
  }
}
