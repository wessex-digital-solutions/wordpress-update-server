import { IsNotEmpty } from 'class-validator';

/**
 * Login DTO
 *
 * @export
 * @class LoginDto
 */
export class LoginDto {
  /**
   * Email
   *
   * @example johndoe@example.com
   * @type {string}
   * @memberof LoginDto
   */
  @IsNotEmpty()
  username!: string;

  /**
   * Password
   *
   * @example password123
   * @type {string}
   * @memberof LoginDto
   */
  @IsNotEmpty()
  password!: string;
}
