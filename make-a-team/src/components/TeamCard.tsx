import { Card } from "primereact/card";
import { TeamPlayers } from "../models/TeamPlayers";
import PlayersList from "./PlayersList";

interface TeamCardProps {
  team: TeamPlayers;
  i: number;
}

export default function TeamCard(props: TeamCardProps) {
  return (
    <Card
      title={`Team ${props.i}`}
      style={{ width: "25rem", marginBottom: "2em" }}
    >
      <div className="m-0" style={{ lineHeight: "1.5" }}>
        <PlayersList players={props.team.names} />
      </div>
    </Card>
  );
}
