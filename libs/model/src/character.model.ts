import { User } from './user.model';

export enum Attribute {
  LEVEL = 'LEVEL',
  GEAR_SCORE = 'GEAR_SCORE',
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
  GREATSWORD = 'GREATSWORD',
  BOW = 'BOW',
  MUSKET = 'MUSKET',
  BLUNDERBUSS = 'BLUNDERBUSS',
  FIRESTAFF = 'FIRESTAFF',
  LIFESTAFF = 'LIFESTAFF',
  ICE_GAUNTLET = 'ICE_GAUNTLET',
  VOID_GAUNTLET = 'VOID_GAUNTLET',
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

export const BASE: Attribute[] = [Attribute.LEVEL, Attribute.GEAR_SCORE];

export const ATTRIBUTES: Attribute[] = [
  Attribute.STRENGTH,
  Attribute.DEXTERITY,
  Attribute.INTELLIGENCE,
  Attribute.FOCUS,
  Attribute.CONSTITUTION,
];

export const WEAPON_SKILLS: Attribute[] = [
  Attribute.SWORD_AND_SHIELD,
  Attribute.RAPIER,
  Attribute.HATCHET,
  Attribute.SPEAR,
  Attribute.GREATAXE,
  Attribute.WARHAMMER,
  Attribute.GREATSWORD,
  Attribute.BOW,
  Attribute.MUSKET,
  Attribute.BLUNDERBUSS,
  Attribute.FIRESTAFF,
  Attribute.LIFESTAFF,
  Attribute.ICE_GAUNTLET,
  Attribute.VOID_GAUNTLET,
];

export const WEAPON_SKILLS_ONE_HANDED: Attribute[] = [Attribute.SWORD_AND_SHIELD, Attribute.RAPIER, Attribute.HATCHET];
export const WEAPON_SKILLS_TWO_HANDED: Attribute[] = [Attribute.SPEAR, Attribute.GREATAXE, Attribute.WARHAMMER, Attribute.GREATSWORD];
export const WEAPON_SKILLS_RANGED: Attribute[] = [Attribute.BOW, Attribute.MUSKET, Attribute.BLUNDERBUSS];
export const WEAPON_SKILLS_MAGIC: Attribute[] = [
  Attribute.FIRESTAFF,
  Attribute.LIFESTAFF,
  Attribute.ICE_GAUNTLET,
  Attribute.VOID_GAUNTLET,
];

export const TRADE_SKILLS: Attribute[] = [
  Attribute.WEAPONSMITHING,
  Attribute.ARMORING,
  Attribute.ENGINEERING,
  Attribute.JEWELCRAFTING,
  Attribute.ARCANA,
  Attribute.COOKING,
  Attribute.FURNISHING,
];

export const REFINING_SKILLS: Attribute[] = [
  Attribute.SMELTING,
  Attribute.WOODWORKING,
  Attribute.LEATHERWORKING,
  Attribute.WEAVING,
  Attribute.STONECUTTING,
];

export const GATHERING_SKILLS: Attribute[] = [
  Attribute.LOGGING,
  Attribute.MINING,
  Attribute.FISHING,
  Attribute.HARVESTING,
  Attribute.TRACKING_AND_SKINNING,
];

export type AttributeQuery = {
  attributes: Attribute[];
};

export type AttributeUpdate = {
  attribute: Attribute;
  value: string;
};

export type CharacterBase = Pick<User, 'id' | 'discordId' | 'characterName'>;

export type Character = CharacterBase & Partial<Record<Attribute, string>>;
