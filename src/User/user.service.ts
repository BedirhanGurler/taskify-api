import { CreateUserDto } from './DTO/create-user.dto';
/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const nowDate = new Date();
    if (!dto.fullName) {
      throw new BadRequestException('Lütfen isim giriniz!');
    }

    const user = this.userRepository.create({
      ...dto,
      isActive: true,
      dateCreated: nowDate,
      dateModified: nowDate,
    });

    return this.userRepository.save(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}
