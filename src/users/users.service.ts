import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private usersRepository: Repository<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const newUser: User = this.usersRepository.create(dto);
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    // Use TypeORM 0.3 findOne with where option
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async update(id: string, dto: UpdateUserDto): Promise<User | null> {
    await this.usersRepository.update(id, dto as any);
    return this.findOne(id);
  }

  async updateStatus(id: string, dto: { isActive: boolean }): Promise<User | null> {
    await this.usersRepository.update(id, { isActive: dto.isActive } as any);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}