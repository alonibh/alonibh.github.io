import { Card } from "primereact/card";
import { Link } from "react-router-dom";
import { TeamDetails } from "../models/TeamDetails";

interface TeamCardLinkProps {
  teamDetails: TeamDetails;
}

export default function TeamCardLink(props: TeamCardLinkProps) {
  return (
    <Link to={`/myTeams/${props.teamDetails.id}`}>
      <Card
        title={`${props.teamDetails.name}`}
        style={{ width: "25rem", marginBottom: "2em" }}
      >
        <div className="m-0" style={{ lineHeight: "1.5" }}>
          <ul>
            <li>Game Date: {props.teamDetails.date.toLocaleString()}</li>
            <li>Players Count: {props.teamDetails.playersCount}</li>
            {/* TODO - Add copy button */}
            <li>Code: {props.teamDetails.code}</li>
          </ul>
        </div>
      </Card>
    </Link>
  );
}
