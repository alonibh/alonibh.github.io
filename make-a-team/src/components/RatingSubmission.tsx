import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";

interface RatingSubmissionProps {
  isAdmin: boolean;
  isSubmitting: boolean;
  onSubmitRatingsClicked: (numOfTeams: number) => void;
}

export default function RatingSubmission(props: RatingSubmissionProps) {
  const [numOfTeams, setNumOfTeams] = useState(3);

  if (props.isAdmin) {
    return (
      <>
        {/* <div className="col-12 md:col-3">
          <Message
            severity="warn"
            text={
              props.unsubmittedPlayersCount +
              " players hasn't submitted ratings"
            }
          />
        </div> */}
        <div className="field col-12 md:col-3">
          <label htmlFor="integeronly">Number of teams</label>
          <InputNumber
            inputId="integeronly"
            value={numOfTeams}
            onValueChange={(e) => setNumOfTeams(e.value ?? 0)}
          />
        </div>
        <Button
          label="Make a team"
          icon="pi pi-check"
          loading={props.isSubmitting}
          onClick={() => props.onSubmitRatingsClicked(numOfTeams)}
        />
      </>
    );
  } else {
    return (
      <Button
        label="Submit"
        icon="pi pi-check"
        loading={props.isSubmitting}
        onClick={() => props.onSubmitRatingsClicked(0)}
      />
    );
  }
}
