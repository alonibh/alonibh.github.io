import { useState } from "react";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import styled from "styled-components";

interface NewTeamProps {
  handleSubmit: (teamName: string, date: string) => void;
}

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;
const FlexItem = styled.div`
  margin-bottom: 1rem;
`;

export default function NewTeamForm(props: NewTeamProps) {
  const [teamName, setTeamName] = useState<string>("");
  const [gameDate, setGameDate] = useState<
    string | Date | Date[] | undefined | null
  >(new Date());

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (gameDate) {
          props.handleSubmit(teamName, gameDate?.toLocaleString());
        }
      }}
    >
      <h3> Create new team</h3>
      <Flex>
        <FlexItem>
          <span className="p-float-label">
            <InputText
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <label htmlFor="teamCode">Name</label>
          </span>
        </FlexItem>
        <FlexItem>
          <Calendar
            value={gameDate}
            onChange={(e: CalendarChangeEvent) => setGameDate(e.value)}
            showTime
          />
        </FlexItem>
      </Flex>

      <Button type="submit" label="Create" className="mt-2" />
    </form>
  );
}
