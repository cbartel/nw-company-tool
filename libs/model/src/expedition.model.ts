export type CreateExpedition = {
  name: ExpeditionName;
  beginDateTime: string;
  hasTuningOrb: boolean;
  role: Role;
};

export type DeleteExpedition = {
  id: number;
};

export type JoinExpedition = {
  id: number;
  role: Role;
  hasTuningOrb: boolean;
};

export type LeaveExpedition = {
  id: number;
};

export type Expedition = {
  id: number;
  name: string;
  beginDateTime: string;
  participants: Participant[];
  owner: Owner;
};

export type Participant = {
  userId: number;
  characterName: string;
  discordId: string;
  role: Role;
  hasTuningOrb: boolean;
};

export type Owner = {
  userId: number;
  characterName: string;
  discordId: string;
};

export enum Role {
  TANK = 'TANK',
  DAMAGE = 'DAMAGE',
  HEAL = 'HEAL',
}

export enum ExpeditionName {
  AMRINE_EXCAVATION = 'AMRINE_EXCAVATION',
  STARSTONE_BARROWS = 'STARSTONE_BARROWS',
  THE_DEPTHS = 'THE_DEPTHS',
  DYNASTY_SHIPYARD = 'DYNASTY_SHIPYARD',
  LAZARUS_INSTRUMENTALITY = 'LAZARUS_INSTRUMENTALITY',
  GARDEN_OF_GENESIS = 'GARDEN_OF_GENESIS',
}
