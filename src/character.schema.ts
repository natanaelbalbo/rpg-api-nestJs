import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Character {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  class: string;

  @Prop({ required: true })
  level: number;

  @Prop({ type: Object })
  attributes: Record<string, number>;

  @Prop([String])
  feats: string[];

  @Prop()
  alignment: string;

  @Prop([String])
  talents: string[];

  @Prop([String])
  spells: string[];

  @Prop([String])
  items: string[];
}

export type CharacterDocument = Character & Document;
export const CharacterSchema = SchemaFactory.createForClass(Character);
