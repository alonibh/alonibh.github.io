import { TeamPlayers } from "../models/TeamPlayers";
import { TeamDetails } from "../models/TeamDetails";
import { UserRating } from "../models/UserRating";
import axios from "axios";
import { UserTeamSettings } from "../models/UserTeamSettings";
import { IsTeamMemberResponse } from "../models/IsTeamMemberResponse";
import { TeamPlayersResponse } from "../models/TeamPlayersResponse";

export class ApiService {
  url: string = "https://make-a-team-be.onrender.com";
  port: number = 5000;

  isTeamMember(
    userId: string,
    teamCode: string
  ): Promise<IsTeamMemberResponse> {
    return axios
      .get(`http://localhost:${this.port}/users/${userId}/teamMember`, {
        params: { teamCode },
      })
      .then((res) => res.data);
  }

  addPlayersToTeam(teamId: string, playersNicknames: string[]): Promise<void> {
    return axios
      .post(
        `http://localhost:${this.port}/teams/${teamId}/addPlayers`,
        playersNicknames
      )
      .then((res) => res.data);
  }

  getUnselectedTeamPlayers(teamId: string): Promise<TeamPlayersResponse> {
    return axios
      .get(`http://localhost:${this.port}/teams/${teamId}/unselectedPlayers`, {
        params: {},
      })
      .then((res) => res.data);
  }

  getTeamName(teamId: string): Promise<string> {
    return axios
      .get(`http://localhost:${this.port}/teams/${teamId}/name`, {
        params: {},
      })
      .then((res) => res.data);
  }

  addUserIfNotExist(userId: string, name: string): Promise<boolean> {
    return axios
      .post(`http://localhost:${this.port}/users`, null, {
        params: { userId, name },
      })
      .then((res) => res.data);
  }

  getUserTeamSettings(
    userId: string,
    teamId: string
  ): Promise<UserTeamSettings> {
    return axios
      .get(`http://localhost:${this.port}/users/${userId}/teamSettings`, {
        params: { userId, teamId },
      })
      .then((res) => res.data);
  }

  updateUser(userId: string, name: string): Promise<void> {
    return axios.patch(`http://localhost:${this.port}/users`, null, {
      params: { userId, name },
    });
  }

  submitRatings(userId: string, ratings: UserRating[]): Promise<void> {
    return axios.post(`http://localhost:${this.port}/ratings`, ratings, {
      params: { userId },
    });
  }

  splitToTeams(teamId: string, numberOfTeams: number): Promise<TeamPlayers[]> {
    return axios
      .post(`http://localhost:${this.port}/teams/${teamId}/split`, null, {
        params: { numberOfTeams },
      })
      .then((res) => res.data);
  }

  getUserTeams(userId: string): Promise<TeamDetails[]> {
    return axios
      .get(`http://localhost:${this.port}/teams/${userId}`, {})
      .then((res) => {
        let teams: TeamDetails[] = [];
        (res.data as TeamDetails[]).forEach((team) => {
          team.date = new Date(team.date);
          teams.push(team);
        });
        return teams;
      });
  }

  getUserName(userId: string): Promise<string> {
    return axios
      .get(`http://localhost:${this.port}/users/${userId}`, {})
      .then((res) => res.data);
  }

  joinTeam(
    teamId: string,
    userId: string,
    selectedNickname: string
  ): Promise<void> {
    return axios.post(
      `http://localhost:${this.port}/teams/${teamId}/join`,
      null,
      {
        params: { userId, selectedNickname },
      }
    );
  }

  createTeam(adminId: string, teamName: string, date: string): Promise<string> {
    return axios
      .post(`http://localhost:${this.port}/teams`, null, {
        params: { adminId, teamName, date },
      })
      .then((res) => {
        return res.data;
      });
  }
}
