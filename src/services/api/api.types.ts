type i18nObj = Record<string, string>;

export interface Choice {
  name: string;
  nameLocalizations?: i18nObj;
  value: string;
}

type CommandType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10;

export interface Option {
  type: CommandType;
  name: string;
  originalName: string;
  nameLocalizations?: i18nObj | null;
  description: string;
  descriptionLocalizations?: i18nObj | null;
  required: boolean;
  choices: Choice[];
  options: Option[];
}

export interface Disabled {
  isDisabled: boolean;
  reason?: string;
}

export interface Command {
  name: string;
  originalName: string;
  nameLocalizations?: i18nObj | null;
  description: string;
  descriptionLocalizations?: i18nObj | null;
  options: Option[];
  disabled: Disabled;
  category: string;
  cooldown: number;
  dimensions: { width: number; height: number };
}

export interface Top {
  commandName: string;
  uses: number;
}

interface BichoPlayer {
  id: string;
  bet: number;
  profit: number;
  didWin: boolean;
  option: string;
}

export interface BichoGame {
  id: number;
  date: number;
  results: number[][];
  players: BichoPlayer[];
}

interface FoundDiscordUser {
  id: string;
  username: string;
  displayName?: string;
  avatar: string;
  found: true;
}

interface UnknownDiscordUser {
  id: string;
  found: false;
}

export type DiscordUser = FoundDiscordUser | UnknownDiscordUser;

export type HuntTypes = 'demon' | 'giant' | 'angel' | 'archangel' | 'demigod' | 'god';

export type WeeklyHuntersTop = {
  user_id: string;
  hunt_type: HuntTypes;
  hunted: number;
  user_tag: string;
};

export type WeeklyHuntersTopDated = { data: WeeklyHuntersTop[]; nextUpdate: number };

export type WeeklyTopFiltered = {
  type: HuntTypes;
  users: WeeklyHuntersTop[];
};
