import { User } from './user.model';

export enum Attribute {
  LEVEL = 'LEVEL',
  STRENGTH = 'STRENGTH',
  DEXTERITY = 'DEXTERITY',
  INTELLIGENCE = 'INTELLIGENCE',
  FOCUS = 'FOCUS',
  CONSTITUTION = 'CONSTITUTION',
  SWORD_AND_SHIELD = 'SWORD_AND_SHIELD',
  RAPIER = 'RAPIER',
  HATCHET = 'HATCHET',
  SPEAR = 'SPEAR',
  GREATAXE = 'GREATAXE',
  WARHAMMER = 'WARHAMMER',
  BOW = 'BOW',
  MUSKET = 'MUSKET',
  FIRESTAFF = 'FIRESTAFF',
  LIFESTAFF = 'LIFESTAFF',
  ICE_GAUNTLET = 'ICE_GAUNTLET',
  WEAPONSMITHING = 'WEAPONSMITHING',
  ARMORING = 'ARMORING',
  ENGINEERING = 'ENGINEERING',
  JEWELCRAFTING = 'JEWELCRAFTING',
  ARCANA = 'ARCANA',
  COOKING = 'COOKING',
  FURNISHING = 'FURNISHING',
  SMELTING = 'SMELTING',
  WOODWORKING = 'WOODWORKING',
  LEATHERWORKING = 'LEATHERWORKING',
  WEAVING = 'WEAVING',
  STONECUTTING = 'STONECUTTING',
  LOGGING = 'LOGGING',
  MINING = 'MINING',
  FISHING = 'FISHING',
  HARVESTING = 'HARVESTING',
  TRACKING_AND_SKINNING = 'TRACKING_AND_SKINNING',
}

export type AttributeQuery = {
  attributes: Attribute[];
};

export type AttributeUpdate = {
  attribute: Attribute;
  value: string;
};

export type CharacterBase = Pick<User, 'id' | 'discordId' | 'characterName'>;

export type Character = CharacterBase & Partial<Record<Attribute, string>>;
