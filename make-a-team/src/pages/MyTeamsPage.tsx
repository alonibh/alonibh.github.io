import { useContext, useEffect, useState } from "react";
import { TeamDetails } from "../models/TeamDetails";
import { ApiService } from "../services/ApiService";
import JoinTeamForm from "../components/JoinTeamForm";
import TeamCardLink from "../components/TeamCardLink";
import NewTeamForm from "../components/NewTeamForm";
import { useHistory } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import styled from "styled-components";
import { UserInfoContext } from "../contexts/UserInfoContext";

export default function MyTeamsPage() {
  const history = useHistory();
  const apiService = new ApiService();
  const [userTeams, setUserTeams] = useState<TeamDetails[]>([]);
  const [name, setName] = useState<string>();

  const userInfo = useContext(UserInfoContext);

  useEffect(() => {
    userInfo?.id &&
      apiService
        .getUserTeams(userInfo?.id)
        .then((userTeams) => setUserTeams(userTeams));
  }, [userInfo?.id]);

  useEffect(() => {
    apiService.getUserName(userInfo?.id!).then((name) => setName(name));
  }, []);

  function joinTeam(teamCode: string) {
    apiService.isTeamMember(userInfo?.id!, teamCode).then((res) => {
      if (res.isTeamMember) {
        history.push(`/myTeams/${res.teamId}`);
      } else {
        history.push(`/myTeams/${res.teamId}/join`);
      }
    });
  }

  function createNewTeam(teamName: string, date: string) {
    apiService.createTeam(userInfo?.id!, teamName, date).then((teamId) => {
      history.push(`/myTeams/${teamId}/edit`);
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
      <h1>Hello, {name}</h1>
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
