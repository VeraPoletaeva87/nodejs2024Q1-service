import { IsNumber, IsString } from '@nestjs/class-validator';

export class CreateAlbumDTO {
  @IsString()
  readonly name!: string;

  @IsNumber()
  readonly year!: number;

  @IsString()
  readonly artistId!: string | null;
}
