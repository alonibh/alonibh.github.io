import { TeamPlayers } from "../models/TeamPlayers";
import TeamCard from "./TeamCard";

interface TeamProps {
  teams: TeamPlayers[];
}

export default function TeamsList(props: TeamProps) {
  return (
    <div className="card">
      <div className="flex flex-wrap card-container blue-container">
        {props.teams.map((team, i) => (
          <TeamCard i={i + 1} team={team} key={i}></TeamCard>
        ))}
      </div>
    </div>
  );
}
