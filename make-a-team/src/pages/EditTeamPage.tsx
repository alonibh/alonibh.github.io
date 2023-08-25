import React, { useContext, useEffect, useState } from "react";
import { Chips, ChipsChangeEvent } from "primereact/chips";
import { Button } from "primereact/button";
import { useHistory, useParams } from "react-router-dom";
import { ApiService } from "../services/ApiService";
import { UserInfoContext as UserInfoContext } from "../contexts/UserInfoContext";

interface urlParams {
  teamId: string;
}

export default function EditTeamPage() {
  const history = useHistory();
  const { teamId } = useParams<urlParams>();
  const [playersNicknames, setPlayersNicknames] = useState<string[]>([]);
  const [teamName, setTeamName] = useState<string>();
  const userInfo = useContext(UserInfoContext);

  const apiService = new ApiService();

  useEffect(() => {
    apiService.getTeamName(teamId).then((teamName) => setTeamName(teamName));
  }, []);

  const handleChipsChange = (e: ChipsChangeEvent) => {
    if (e.value) {
      setPlayersNicknames(e.value);
    }
  };

  const handleSubmit = () => {
    // TODO must enfore no duplicates
    apiService.addPlayersToTeam(teamId, playersNicknames).then(() => {
      history.push(`/myTeams/${teamId}`);
    });
  };

  return (
    <div>
      <h2>{teamName}</h2>
      <Chips
        value={playersNicknames}
        onChange={handleChipsChange}
        placeholder="Enter other players names"
      />
      <Button label="Submit" onClick={handleSubmit} />
    </div>
  );
}
