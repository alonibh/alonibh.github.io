import { Button } from "primereact/button";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import styled from "styled-components";

interface JoinTeamProps {
  handleSubmit: (teamCode: string) => void;
}

const FlexItem = styled.div`
  margin-bottom: 1rem;
`;

export default function JoinTeamForm(props: JoinTeamProps) {
  const [teamCode, setTeamCode] = useState<string>("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.handleSubmit(teamCode);
      }}
    >
      <h3>Join existing team</h3>
      <FlexItem>
        <span className="p-float-label">
          <InputText
            id="teamCode"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
          />
          <label htmlFor="teamCode">Team Code</label>
        </span>
      </FlexItem>
      <Button type="submit" label="Join" className="mt-2" />
    </form>
  );
}
