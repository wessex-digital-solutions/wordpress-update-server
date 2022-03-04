import { User } from '../../users/entities/user.entity';

export class LoginResponseDto {
  accessToken!: string;
  user!: User;
}
