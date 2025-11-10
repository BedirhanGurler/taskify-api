import { CreateUserDto } from './../User/DTO/create-user.dto';
import * as bcrypt from 'bcrypt';

/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/User/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException(
        'Bu email ile kayıtlı kullanıcı zaten var!',
      );
    }

    const hashedPass = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.create({
      ...dto,
      password: hashedPass,
      dateCreated: new Date(),
      dateModified: new Date(),
      isActive: true,
    });
    return {
      message: 'Kullanıcı kaydı başarılı.',
      userId: user.id,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Kullanıcı bulunamadı!');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Hatalı Şifre!');
    }
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      expires_in: '1h',
    };
  }
}
