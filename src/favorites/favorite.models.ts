import { IsArray } from '@nestjs/class-validator';

export class CreateFavDTO {
  @IsArray()
  readonly artists!: string[]; // favorite artists ids

  @IsArray()
  readonly albums!: string[]; // favorite albums ids

  @IsArray()
  readonly tracks!: string[]; // favorite tracks ids
}
