import { IsArray } from '@nestjs/class-validator';

export class CreateFavDTO {
  @IsArray()
  readonly artists!: string[]; // favorite artists ids

  @IsArray()
  readonly albums!: string[]; // favorite artists ids

  @IsArray()
  readonly tracks!: string[]; // favorite artists ids
}
