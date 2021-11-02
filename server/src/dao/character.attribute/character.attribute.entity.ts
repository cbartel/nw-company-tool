import { Attribute } from '../../model/character.model';

export type CharacterAttributeEntity = {
  user_id: number;
  key: string;
  value: string;
};

export type CharacterAttributePivotEntity = { id: number; character_name: string; discord_id: string } & Partial<
  Record<Attribute, number>
>;
