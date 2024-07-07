export enum Gender {
  None = "None",
  Male = "Male",
  Female = "Female",
  Both = "Both",
}

export enum Region {
  None = "None",
  US_EAST = "US East",
  US_WEST = "US West",
  EUROPE = "Europe",
  ASIA_EAST = "Asia East",
  MIDDLE_EAST = "Middle East",
  OCEANA = "Oceana",
  SOUTH_AFRICA = "South Africa",
  SOUTH_AMERICA = "South America",
  INDIA = "India",
}

export enum Platform {
  PC = "PC",
  Xbox = "Xbox",
  Playstation = "Playstation",
}

export type Game = {
  id: number;
  name: string;
  cover: string;
};

export type UserPreferences = {
  region: Region;
  voice: boolean;
  platform: Platform[];
  teammate_platform: Platform[];
  preferred_gender: Gender;
  min_age: number;
  max_age: number;
  games: Game[];
};

export type User = {
  email: string;
  password: string;
  username: string;
  discord: string;
  dob?: Date;
  created_at?: Date;
  country: string;
  gender: Gender;
  languages: string[];
  bio: string;
  avatar?: string;
  rating?: number;
  rating_count?: number;
  preferences: UserPreferences;
};

export type UserResult = {
  user?: User;
  error?: string;
  emailError?: string;
  usernameError?: string;
  accessToken?: string;
  existError?: string;
};

export const NullUserPreferences: UserPreferences = {
  region: Region.None,
  voice: false,
  platform: [],
  preferred_gender: Gender.None,
  min_age: 18,
  max_age: 100,
  teammate_platform: [],
  games: [],
};

export const NullUser: User = {
  email: "",
  password: "",
  username: "",
  discord: "",
  dob: undefined,
  created_at: undefined,
  country: "",
  gender: Gender.None,
  languages: [],
  bio: "",
  avatar: "",
  rating: 0,
  rating_count: 0,
  preferences: NullUserPreferences,
};
