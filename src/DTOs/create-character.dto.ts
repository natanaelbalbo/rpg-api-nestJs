import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, ValidateNested, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

class Attributes {
  @IsNumber()
  strength: number;

  @IsNumber()
  dexterity: number;

  @IsNumber()
  constitution: number;

  @IsNumber()
  intelligence: number;

  @IsNumber()
  wisdom: number;

  @IsNumber()
  charisma: number;
}

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  class: string;

  @IsNumber()
  level: number;

  @ValidateNested()
  @Type(() => Attributes)
  attributes: Attributes;

  @IsArray()
  @IsOptional()
  feats?: string[];

  @IsString()
  @IsOptional()
  alignment?: string;

  @IsArray()
  @IsOptional()
  talents?: string[];

  @IsArray()
  @IsOptional()
  spells?: string[];

  @IsArray()
  @IsOptional()
  items?: string[];
}
