import { UserRating } from "./UserRating";

export interface UserTeamSettings {
  ratings: UserRating[];
  name: string;
  isUserAdminOfTeam: boolean;
}
