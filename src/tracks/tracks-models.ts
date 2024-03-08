import { IsNumber, IsString } from '@nestjs/class-validator';

export class CreateTrackDTO {
  @IsString()
  readonly name!: string;

  @IsNumber()
  readonly duration!: number;

  @IsString()
  readonly artistId!: string;

  @IsString()
  readonly albumId!: string;
}

// export class UpdatePasswordDto {
//   @IsString()
//   readonly oldPassword!: string;

//   @IsString()
//   readonly newPassword!: string;
// }
