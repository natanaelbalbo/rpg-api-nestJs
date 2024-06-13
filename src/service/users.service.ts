import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument} from 'src/schema/user.schema';
import { CreateUserDto } from 'src/DTOs/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ username: createUserDto.username }).exec();
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  async update(id: string, updateUserDto: Partial<CreateUserDto>): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!updatedUser) {
      throw new UserNotFoundException(id);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const removedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!removedUser) {
      throw new UserNotFoundException(id);
    }
    return removedUser;
  }

  async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
