import { Injectable } from '@nestjs/common';
import { Attribute, Character } from '@nw-company-tool/model';
import { DatabaseClient } from '../database/database.client';

@Injectable()
export class CharacterService {
  constructor(private client: DatabaseClient) {}

  async getCharacterByUserId(id: number): Promise<Character> {
    return this.client.user
      .findUnique({
        select: {
          id: true,
          discordId: true,
          characterName: true,
          CharacterAttribute: {
            select: {
              key: true,
              value: true,
            },
          },
        },
        where: {
          id,
        },
      })
      .then((result) => {
        const character: Character = {
          id: result.id,
          discordId: result.discordId,
          characterName: result.characterName,
        };
        result.CharacterAttribute.reduce((acc, attribute) => ((acc[attribute.key] = attribute.value), acc), character);
        return character;
      });
  }

  async queryAttributes(attributes: Attribute[]): Promise<Character[]> {
    return this.client.user
      .findMany({
        select: {
          id: true,
          discordId: true,
          characterName: true,
          CharacterAttribute: {
            select: {
              key: true,
              value: true,
            },
            where: {
              key: {
                in: attributes,
              },
            },
          },
        },
      })
      .then((result) =>
        result.map((it) => {
          const character: Character = {
            id: it.id,
            discordId: it.discordId,
            characterName: it.characterName,
          };
          it.CharacterAttribute.reduce((acc, attribute) => ((acc[attribute.key] = attribute.value), acc), character);
          return character;
        }),
      );
  }

  async updateAttributes(userId: number, attribute: Attribute, value: string): Promise<void> {
    await this.client.characterAttribute.upsert({
      where: {
        userId_key: {
          userId,
          key: attribute,
        },
      },
      create: {
        userId,
        key: attribute,
        value,
      },
      update: {
        value,
      },
    });
  }
}
