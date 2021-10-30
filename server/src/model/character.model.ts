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
  LEATERWORKING = 'LEATERWORKING',
  WEAVING = 'WEAVING',
  STONECUTTING = 'STONECUTTING',
  LOGGING = 'LOGGING',
  MINING = 'MINING',
  FISHING = 'FISHING',
  HARVESTING = 'HARVESTING',
  TRACKING_AND_SKINNING = 'TRACKING_AND_SKINNING'
}

export type CharacterAttributes = {
  level: number;
  attributes: {
    strength: number;
    dexterity: number;
    intelligence: number;
    focus: number;
    constitution: number;
  };
  weaponMastery: {
    oneHanded: {
      swordAndShield: number;
      rapier: number;
      hatchet: number;
    };
    twoHanded: {
      spear: number;
      greataxe: number;
      warhammer: number;
    };
    ranged: {
      bow: number;
      musket: number;
    };
    magic: {
      firestaff: number;
      lifestaff: number;
      iceGauntlet: number;
    };
  };
  tradeSkills: {
    crafting: {
      weaponSmithing: number;
      armoring: number;
      engineering: number;
      jewelcrafting: number;
      arcana: number;
      cooking: number;
      furnishing: number;
    };
    refining: {
      smelting: number;
      woodworking: number;
      leatherworking: number;
      weaving: number;
      stonecutting: number;
    };
    gathering: {
      logging: number;
      mining: number;
      fishing: number;
      harvesting: number;
      trackingAndSkinning: number;
    };
  };
};

export type Character = {
  id: number;
  characterName: string;
};
