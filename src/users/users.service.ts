import { Injectable, ConflictException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUsersDto } from './dto/list-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private usersRepository: Repository<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    // Auto-generate a username if not provided (based on email or name)
    const toSave: any = { ...dto };
    if (!toSave.username) {
      const base = dto.email ? dto.email.split('@')[0] : (dto.name ? dto.name.replace(/\s+/g, '').toLowerCase() : 'user');
      let candidate = base;
      let suffix = 0;
      // ensure uniqueness
      while (await this.findByUsername(candidate)) {
        suffix += 1;
        candidate = `${base}${suffix}`;
      }
      toSave.username = candidate;
    }

    if (!toSave.password) {
      throw new BadRequestException('Password is required');
    }

    try {
      // Hash password before saving to DB to avoid storing plaintext
      const salt = await bcrypt.genSalt(10);
      toSave.password = await bcrypt.hash(toSave.password, salt);

      const newUser = (this.usersRepository.create(toSave as any) as unknown) as User;
      return await this.usersRepository.save(newUser);
    } catch (err: any) {
      // Unique constraint (email or username) handling
      const msg = err?.message || err?.toString?.() || '';
      if (/duplicate|unique|23505|UNIQUE constraint/i.test(msg)) {
        throw new ConflictException('User with provided identifier already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(options?: ListUsersDto): Promise<{ data: User[]; total: number; page: number; limit: number }> {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 10;
    const skip = (page - 1) * limit;

    const qb = this.usersRepository.createQueryBuilder('user');

    if (options?.isActive !== undefined) {
      qb.andWhere('user.isActive = :isActive', { isActive: options.isActive });
    }

    if (options?.search) {
      const s = `%${options.search}%`;
      qb.andWhere('(user.username LIKE :s OR user.email LIKE :s)', { s });
    }

    const sort = options?.sort === 'DESC' ? 'DESC' : 'ASC';
    qb.orderBy('user.createdAt', sort as 'ASC' | 'DESC');

    qb.skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<User | null> {
    // Use TypeORM 0.3 findOne with where option
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneByResetToken(resetToken: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { resetToken } });
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