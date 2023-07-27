import { useEffect, useState } from "react";
import { TeamDetails } from "../models/TeamDetails";
import { ApiService } from "../services/ApiService";
import JoinTeamForm from "../components/JoinTeamForm";
import TeamCardLink from "../components/TeamCardLink";
import NewTeamForm from "../components/NewTeamForm";
import { useHistory } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

export default function MyTeamsPage() {
  const history = useHistory();
  const apiService = new ApiService();
  const [userTeams, setUserTeams] = useState<TeamDetails[]>([]);
  const { user } = useAuth0();
  const userId = user?.sub ?? "";

  useEffect(() => {
    userId &&
      apiService
        .getUserTeams(userId)
        .then((userTeams) => setUserTeams(userTeams));
  }, [userId]);

  function joinTeam(teamCode: string) {
    apiService.joinTeam(userId, teamCode).then((importedTeam) => {
      setUserTeams([...userTeams, importedTeam]);
    });
  }

  function createNewTeam(teamName: string, date: string) {
    apiService.createTeam(userId, teamName, date).then((teamId) => {
      history.push(`/myTeams/${teamId}`);
    });
  }

  const teamCards = userTeams.map((team, i) => (
    <TeamCardLink teamDetails={team} key={i}></TeamCardLink>
  ));

  const Flex = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const FlexItem = styled.div`
    margin: 1rem;
  `;

  return (
    <>
      <h1>Hello, {user?.name}</h1>
      <div className="card">
        <div className="flex flex-wrap card-container blue-container">
          {teamCards}
        </div>
      </div>
      <Flex>
        <FlexItem>
          <JoinTeamForm handleSubmit={joinTeam} />
        </FlexItem>
        <FlexItem>
          <NewTeamForm handleSubmit={createNewTeam} />
        </FlexItem>
      </Flex>
      <LogoutButton />
    </>
  );
}
