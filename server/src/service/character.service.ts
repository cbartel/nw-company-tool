import { CharacterAttributeDao } from '../dao/character.attribute/character.attribute.dao';
import { Attribute, Character, CharacterAttributes, CharacterWithPartialAttributes } from '../model/character.model';
import { UserDao } from '../dao/user/user.dao';

export class CharacterService {
  private static readonly INSTANCE = new CharacterService();
  public static get(): CharacterService {
    return CharacterService.INSTANCE;
  }

  private readonly characterAttributeDao = CharacterAttributeDao.get();
  private readonly userDao = UserDao.get();

  private constructor() {}

  public getAllCharacters(): Character[] {
    const entities = this.userDao.findAllEnabled();
    if (!entities) {
      return [];
    }
    return entities.map((entity) => ({
      id: entity.id!,
      characterName: entity.character_name,
      discordId: entity.discord_id
    }));
  }

  public updateAttribute(userId: number, attribute: Attribute, value: string) {
    this.characterAttributeDao.put({
      user_id: userId,
      key: attribute,
      value
    });
  }

  public getAllAttributes(userId: number): CharacterAttributes | undefined {
    const entities = this.characterAttributeDao.findByUserId(userId);
    if (!entities) {
      return undefined;
    }
    const characterAttributes = CharacterService.createCharacterAttributes();
    entities?.forEach((entity) => {
      switch (entity.key) {
        case Attribute.LEVEL: {
          characterAttributes.level = Number(entity.value);
          break;
        }
        case Attribute.STRENGTH: {
          characterAttributes.attributes.strength = Number(entity.value);
          break;
        }
        case Attribute.DEXTERITY: {
          characterAttributes.attributes.dexterity = Number(entity.value);
          break;
        }
        case Attribute.INTELLIGENCE: {
          characterAttributes.attributes.intelligence = Number(entity.value);
          break;
        }
        case Attribute.FOCUS: {
          characterAttributes.attributes.focus = Number(entity.value);
          break;
        }
        case Attribute.CONSTITUTION: {
          characterAttributes.attributes.constitution = Number(entity.value);
          break;
        }
        case Attribute.SWORD_AND_SHIELD: {
          characterAttributes.weaponMastery.oneHanded.swordAndShield = Number(entity.value);
          break;
        }
        case Attribute.RAPIER: {
          characterAttributes.weaponMastery.oneHanded.rapier = Number(entity.value);
          break;
        }
        case Attribute.HATCHET: {
          characterAttributes.weaponMastery.oneHanded.hatchet = Number(entity.value);
          break;
        }
        case Attribute.SPEAR: {
          characterAttributes.weaponMastery.twoHanded.spear = Number(entity.value);
          break;
        }
        case Attribute.GREATAXE: {
          characterAttributes.weaponMastery.twoHanded.greataxe = Number(entity.value);
          break;
        }
        case Attribute.WARHAMMER: {
          characterAttributes.weaponMastery.twoHanded.warhammer = Number(entity.value);
          break;
        }
        case Attribute.BOW: {
          characterAttributes.weaponMastery.ranged.bow = Number(entity.value);
          break;
        }
        case Attribute.MUSKET: {
          characterAttributes.weaponMastery.ranged.musket = Number(entity.value);
          break;
        }
        case Attribute.FIRESTAFF: {
          characterAttributes.weaponMastery.magic.firestaff = Number(entity.value);
          break;
        }
        case Attribute.LIFESTAFF: {
          characterAttributes.weaponMastery.magic.lifestaff = Number(entity.value);
          break;
        }
        case Attribute.ICE_GAUNTLET: {
          characterAttributes.weaponMastery.magic.iceGauntlet = Number(entity.value);
          break;
        }
        case Attribute.WEAPONSMITHING: {
          characterAttributes.tradeSkills.crafting.weaponSmithing = Number(entity.value);
          break;
        }
        case Attribute.ARMORING: {
          characterAttributes.tradeSkills.crafting.armoring = Number(entity.value);
          break;
        }
        case Attribute.ENGINEERING: {
          characterAttributes.tradeSkills.crafting.engineering = Number(entity.value);
          break;
        }
        case Attribute.JEWELCRAFTING: {
          characterAttributes.tradeSkills.crafting.jewelcrafting = Number(entity.value);
          break;
        }
        case Attribute.ARCANA: {
          characterAttributes.tradeSkills.crafting.arcana = Number(entity.value);
          break;
        }
        case Attribute.COOKING: {
          characterAttributes.tradeSkills.crafting.cooking = Number(entity.value);
          break;
        }
        case Attribute.FURNISHING: {
          characterAttributes.tradeSkills.crafting.furnishing = Number(entity.value);
          break;
        }
        case Attribute.SMELTING: {
          characterAttributes.tradeSkills.refining.smelting = Number(entity.value);
          break;
        }
        case Attribute.WOODWORKING: {
          characterAttributes.tradeSkills.refining.woodworking = Number(entity.value);
          break;
        }
        case Attribute.LEATHERWORKING: {
          characterAttributes.tradeSkills.refining.leatherworking = Number(entity.value);
          break;
        }
        case Attribute.WEAVING: {
          characterAttributes.tradeSkills.refining.weaving = Number(entity.value);
          break;
        }
        case Attribute.STONECUTTING: {
          characterAttributes.tradeSkills.refining.stonecutting = Number(entity.value);
          break;
        }
        case Attribute.LOGGING: {
          characterAttributes.tradeSkills.gathering.logging = Number(entity.value);
          break;
        }
        case Attribute.MINING: {
          characterAttributes.tradeSkills.gathering.mining = Number(entity.value);
          break;
        }
        case Attribute.FISHING: {
          characterAttributes.tradeSkills.gathering.fishing = Number(entity.value);
          break;
        }
        case Attribute.HARVESTING: {
          characterAttributes.tradeSkills.gathering.harvesting = Number(entity.value);
          break;
        }
        case Attribute.TRACKING_AND_SKINNING: {
          characterAttributes.tradeSkills.gathering.trackingAndSkinning = Number(entity.value);
          break;
        }
        default: {
          console.warn(`unknown attribute key ${entity.key} for user with id ${userId}`);
        }
      }
    });
    return characterAttributes;
  }

  public queryWithAttributes(attributes: Attribute[]): CharacterWithPartialAttributes[] {
    const entities = this.characterAttributeDao.findAllAndPivotAttributes(attributes);
    if (!entities) {
      return [];
    }
    return entities.map((entity) => {
      const resultRecord: Partial<Record<Attribute, number>> = {};
      attributes.forEach((attribute) => (resultRecord[attribute] = entity[attribute] || 0));
      return {
        id: entity.id,
        characterName: entity.character_name,
        discordId: entity.discord_id,
        ...resultRecord
      };
    });
  }

  private static createCharacterAttributes(): CharacterAttributes {
    return {
      level: 0,
      attributes: { constitution: 0, dexterity: 0, focus: 0, intelligence: 0, strength: 0 },
      tradeSkills: {
        crafting: {
          arcana: 0,
          armoring: 0,
          cooking: 0,
          engineering: 0,
          furnishing: 0,
          jewelcrafting: 0,
          weaponSmithing: 0
        },
        gathering: { fishing: 0, harvesting: 0, logging: 0, mining: 0, trackingAndSkinning: 0 },
        refining: { leatherworking: 0, smelting: 0, stonecutting: 0, weaving: 0, woodworking: 0 }
      },
      weaponMastery: {
        magic: { firestaff: 0, iceGauntlet: 0, lifestaff: 0 },
        oneHanded: { hatchet: 0, rapier: 0, swordAndShield: 0 },
        ranged: { bow: 0, musket: 0 },
        twoHanded: { greataxe: 0, spear: 0, warhammer: 0 }
      }
    };
  }
}
