import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // Extract role names from the user object structure
    const roles = user.roles ? user.roles.map((ur: any) => ur.role.name) : [];
    const payload = { username: user.email, sub: user.id, roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, pass: string, name: string) {
    const hashedPassword = await bcrypt.hash(pass, 10);
    // Note: Role assignment should happen here.
    // For MVP setup, we'll create the user without roles initially or handle it in UsersService.
    return this.usersService.create({
      email,
      passwordHash: hashedPassword,
      name,
    });
  }
}
