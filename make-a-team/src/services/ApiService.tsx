import { TeamPlayers } from "../models/TeamPlayers";
import { TeamDetails } from "../models/TeamDetails";
import { UserRating } from "../models/UserRating";
import axios from "axios";
import { UserTeamSettings } from "../models/UserTeamSettings";

export class ApiService {
  url: string = "https://make-a-team-be.onrender.com";

  addUserIfNotExist(userId: string, name: string): Promise<boolean> {
    return axios
      .post(`${this.url}/users`, null, {
        params: { userId, name },
      })
      .then((res) => res.data);
  }

  getUserTeamSettings(
    userId: string,
    teamId: string
  ): Promise<UserTeamSettings> {
    return axios
      .get(`${this.url}/userteamsettings`, {
        params: { userId, teamId },
      })
      .then((res) => res.data);
  }

  updateUser(userId: string, name: string): Promise<void> {
    return axios.patch(`${this.url}/users`, null, {
      params: { userId, name },
    });
  }

  submitRatings(
    userId: string,
    teamId: string,
    ratings: UserRating[]
  ): Promise<void> {
    return axios.post(`${this.url}/ratings`, ratings, {
      params: { userId, teamId },
    });
  }

  splitToTeams(teamId: string, numberOfTeams: number): Promise<TeamPlayers[]> {
    return axios
      .post(`${this.url}/teams/split`, null, {
        params: { teamId, numberOfTeams },
      })
      .then((res) => res.data);
  }

  getUserTeams(userId: string): Promise<TeamDetails[]> {
    return axios.get(`${this.url}/teams/${userId}`, {}).then((res) => {
      let teams: TeamDetails[] = [];
      (res.data as TeamDetails[]).forEach((team) => {
        team.date = new Date(team.date);
        teams.push(team);
      });
      return teams;
    });
  }

  getUserName(userId: string): Promise<string> {
    return axios.get(`${this.url}/users/${userId}`, {}).then((res) => res.data);
  }

  joinTeam(userId: string, teamCode: string): Promise<TeamDetails> {
    return axios
      .post(`${this.url}/teams/join`, null, {
        params: { userId, teamCode },
      })
      .then((res) => {
        let importedTeam: TeamDetails = res.data;
        importedTeam.date = new Date(importedTeam.date);
        return importedTeam;
      });
  }

  createTeam(userId: string, teamName: string, date: string): Promise<string> {
    return axios
      .post(`${this.url}/teams`, null, {
        params: { userId, teamName, date },
      })
      .then((res) => {
        return res.data;
      });
  }
}
