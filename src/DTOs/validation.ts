import { IsString, IsInt, IsArray, IsOptional, Min, Max } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  name: string;

  @IsString()
  class: string;

  @IsInt()
  @Min(1)
  @Max(20)
  level: number;

  @IsOptional()
  @IsArray()
  feats: string[];

  @IsOptional()
  @IsString()
  alignment: string;

  @IsOptional()
  @IsArray()
  talents: string[];

  @IsOptional()
  @IsArray()
  spells: string[];

  @IsOptional()
  @IsArray()
  items: string[];
}
