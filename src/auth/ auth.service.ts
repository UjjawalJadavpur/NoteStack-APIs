import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/ users.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/ login-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterRequestDto): Promise<string> {
    const exists = await this.usersService.existsByEmail(dto.email);
    if (exists) throw new Error('Email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.createUser({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    return 'User registered successfully';
  }

  async login(dto: LoginRequestDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('User not found!');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid password!');

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      name: user.name,
    });
    return new AuthResponseDto(token);
  }
}
