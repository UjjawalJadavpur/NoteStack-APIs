import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/ login-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthService } from './ auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterRequestDto): Promise<string> {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginRequestDto): Promise<AuthResponseDto> {
    return this.authService.login(dto);
  }
}
