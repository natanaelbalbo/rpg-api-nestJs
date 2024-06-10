import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CharacterDocument = Character & Document;

@Schema()
export class Character {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  class: string;

  @Prop({ type: Map, of: Number, required: true })
  attributes: Record<string, number>;

  @Prop([String])
  feats: string[];

  @Prop()
  alignment: string;

  @Prop([String])
  skills: string[];

  @Prop([String])
  spells: string[];

  @Prop([String])
  items: string[];
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
