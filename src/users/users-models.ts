import { IsString } from '@nestjs/class-validator';

export class CreateUserDTO {
  @IsString()
  readonly login!: string;

  @IsString()
  readonly password!: string;
}

export class UpdatePasswordDto {
  @IsString()
  readonly oldPassword!: string;

  @IsString()
  readonly newPassword!: string;
}
