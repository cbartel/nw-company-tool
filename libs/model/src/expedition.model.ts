export type Expedition = {
  name: string;
  beginDateTime: string;
  participants: Participant[];
  owner: Owner;
};

export type Participant = {
  userId: number;
  characterName: string;
  discordId: string;
  role: 'tank' | 'damage' | 'heal';
  hasKey: boolean;
};

export type Owner = {
  userId: number;
  characterName: string;
  discordId: string;
};
