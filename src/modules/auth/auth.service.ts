import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from 'src/common/exceptions/user-not-found.exception';
import { UsersService } from '../users/users.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userService.findOne({ username });
    if (!user) {
      throw new UserNotFoundException();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const jwtPayload = { id: user.id };
    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      issuer: 'api',
      subject: user.id.toString(),
      expiresIn: '1h',
    });

    delete user.password;

    const response: LoginResponseDto = {
      accessToken,
      user,
    };

    return response;
  }
}
