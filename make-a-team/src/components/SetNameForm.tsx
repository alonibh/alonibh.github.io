import { Button } from "primereact/button";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import styled from "styled-components";

interface SetNameProps {
  handleSubmit: (name: string) => void;
  name: string | undefined;
}

const FlexItem = styled.div`
  margin-bottom: 1rem;
`;

export default function SetNameForm(props: SetNameProps) {
  const [name, setName] = useState<string>(props.name ?? "");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.handleSubmit(name);
      }}
    >
      <h3>Set your name</h3>
      <FlexItem>
        <span className="p-float-label">
          <InputText
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </span>
      </FlexItem>
      <Button type="submit" label="Set" className="mt-2" />
    </form>
  );
}
