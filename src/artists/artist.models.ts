import { IsBoolean, IsString } from '@nestjs/class-validator';

export class CreateArtistDTO {
  @IsString()
  readonly name!: string;

  @IsBoolean()
  readonly grammy!: boolean;
}
