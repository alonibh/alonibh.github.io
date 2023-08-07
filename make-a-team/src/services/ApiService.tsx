import { TeamPlayers } from "../models/TeamPlayers";
import { TeamDetails } from "../models/TeamDetails";
import { UserRating } from "../models/UserRating";
import axios from "axios";
import { UserTeamSettings } from "../models/UserTeamSettings";
import { IsTeamMemberResponse } from "../models/IsTeamMemberResponse";
import { TeamPlayersResponse } from "../models/TeamPlayersResponse";

export class ApiService {
  url: string = "https://make-a-team-be.onrender.com";
  port: number = 8080;

  isTeamMember(id: string, teamCode: string): Promise<IsTeamMemberResponse> {
    return new Promise((resolve) =>
      resolve({ isTeamMember: false, teamId: "123" })
    );
  }

  addPlayersToTeam(teamId: string, playersNicknames: string[]): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  getTeamPlayers(teamId: string): Promise<TeamPlayersResponse> {
    return new Promise((resolve) =>
      resolve({ name: "Rishon1", players: ["player1", "player2", "player3"] })
    );
  }

  getTeamName(teamId: string): Promise<string> {
    return new Promise((resolve) => resolve("Sunday in Rishon"));
  }

  // addUserIfNotExist(userId: string, name: string): Promise<boolean> {
  //   return axios
  //     .post(`http://localhost:${this.port}/users`, null, {
  //       params: { userId, name },
  //     })
  //     .then((res) => res.data);
  // }

  addUserIfNotExist(userId: string, name: string): Promise<boolean> {
    return new Promise((resolve) => resolve(false));
  }

  // getUserTeamSettings(
  //   userId: string,
  //   teamId: string
  // ): Promise<UserTeamSettings> {
  //   return axios
  //     .get(`http://localhost:${this.port}/userteamsettings`, {
  //       params: { userId, teamId },
  //     })
  //     .then((res) => res.data);
  // }

  getUserTeamSettings(
    userId: string,
    teamId: string
  ): Promise<UserTeamSettings> {
    let userTeamSettings: UserTeamSettings = {
      isUserAdminOfTeam: true,
      name: "Sunday in Rishon",
      ratings: [
        { name: "Alon", rating: 5, userId: 123 },
        { name: "John", rating: 4, userId: 423 },
        { name: "Dani", rating: 3, userId: 523 },
      ],
    };
    return new Promise((resolve) => resolve(userTeamSettings));
  }

  updateUser(userId: string, name: string): Promise<void> {
    return axios.patch(`http://localhost:${this.port}/users`, null, {
      params: { userId, name },
    });
  }

  submitRatings(
    userId: string,
    teamId: string,
    ratings: UserRating[]
  ): Promise<void> {
    return axios.post(`http://localhost:${this.port}/ratings`, ratings, {
      params: { userId, teamId },
    });
  }

  splitToTeams(teamId: string, numberOfTeams: number): Promise<TeamPlayers[]> {
    return axios
      .post(`http://localhost:${this.port}/teams/split`, null, {
        params: { teamId, numberOfTeams },
      })
      .then((res) => res.data);
  }

  // getUserTeams(userId: string): Promise<TeamDetails[]> {
  //   return axios
  //     .get(`http://localhost:${this.port}/teams/${userId}`, {})
  //     .then((res) => {
  //       let teams: TeamDetails[] = [];
  //       (res.data as TeamDetails[]).forEach((team) => {
  //         team.date = new Date(team.date);
  //         teams.push(team);
  //       });
  //       return teams;
  //     });
  // }

  getUserTeams(userId: string): Promise<TeamDetails[]> {
    return new Promise((resolve) => {
      let teams: TeamDetails[] = [
        {
          id: "123456",
          code: "111111",
          date: new Date("11/10/2023"),
          name: "Rishon1",
          playersCount: 5,
        },
        {
          id: "234567",
          code: "222222",
          date: new Date("11/10/2023"),
          name: "Rishon2",
          playersCount: 6,
        },
      ];
      resolve(teams);
    });
  }

  // getUserName(userId: string): Promise<string> {
  //   return axios
  //     .get(`http://localhost:${this.port}/users/${userId}`, {})
  //     .then((res) => res.data);
  // }

  getUserName(userId: string): Promise<string> {
    return new Promise((resolve) => {
      resolve("Alon");
    });
  }

  joinTeam(
    userId: string,
    teamId: string,
    selectedNickname: string
  ): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  // createTeam(userId: string, teamName: string, date: string): Promise<string> {
  //   return axios
  //     .post(`http://localhost:${this.port}/teams`, null, {
  //       params: { userId, teamName, date },
  //     })
  //     .then((res) => {
  //       return res.data;
  //     });
  // }

  createTeam(userId: string, teamName: string, date: string): Promise<string> {
    return new Promise((resolve) => {
      resolve("123");
    });
  }
}
