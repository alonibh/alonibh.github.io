import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ApiService } from "../services/ApiService";
import { UserInfoContext as UserInfoContext } from "../contexts/UserInfoContext";
import SelectTable, { Nickname } from "../components/SelectTable";

interface urlParams {
  teamId: string;
}

export default function JoinTeamPage() {
  const history = useHistory();
  const { teamId } = useParams<urlParams>();
  const [playersNicknames, setPlayersNicknames] = useState<string[]>([]);
  const [teamName, setTeamName] = useState<string>();
  const userInfo = useContext(UserInfoContext);

  const apiService = new ApiService();

  useEffect(() => {
    apiService.getUnselectedTeamPlayers(teamId).then((res) => {
      setTeamName(res.name);
      setPlayersNicknames(res.players);
    });
  }, []);

  const handleSelect = (selectedNickname: string) => {
    apiService.joinTeam(userInfo?.id!, teamId, selectedNickname).then(() => {
      history.push(`/myTeams/${teamId}`);
    });
  };
  const nicknames: Nickname[] = playersNicknames.map((nickname) => ({
    nickname,
  }));

  return (
    <div>
      <h2>{teamName}</h2>
      <h2>Select yourself:</h2>
      <SelectTable nicknames={nicknames} handleSelect={handleSelect} />
    </div>
  );
}
