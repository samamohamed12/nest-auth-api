import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// This should be a real class/interface representing a user entity
export type User = {
  userId: number;
  username: string;
  password: string;
  name?: string;
  email?: string;
  isActive?: boolean;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async create(dto: CreateUserDto): Promise<User> {
    const newUser: User = {
      userId: Date.now(),
      username: (dto as any).name ?? (dto as any).username ?? `user_${Date.now()}`,
      password: (dto as any).password,
      name: (dto as any).name,
      email: (dto as any).email,
      isActive: (dto as any).isActive ?? true,
    };
    this.users.push(newUser);
    return newUser;
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.users.find(user => user.userId === id);
  }

  /**
   * Find a user by username (used by AuthService)
   */
  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
 
  async findAll(): Promise<User[]> {
    return this.users;
  }
  async update(id: number, dto: UpdateUserDto): Promise<User | undefined> {
    const userIndex = this.users.findIndex(user => user.userId === id);
    if (userIndex === -1) {
      return undefined;
    }
    this.users[userIndex] = { ...this.users[userIndex], ...dto };
    return this.users[userIndex];
  }

  async remove(id: number): Promise<User | undefined> {
    const userIndex = this.users.findIndex(user => user.userId === id);
    if (userIndex === -1) {
      return undefined;
    }
    const removedUser = this.users.splice(userIndex, 1)[0];
    return removedUser;
  }
}