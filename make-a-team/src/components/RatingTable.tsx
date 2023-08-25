import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { UserRating } from "../models/UserRating";

interface RatingTableProps {
  ratings: UserRating[];
  onRatingsChanged: (subjectNickname: string, rating: number) => void;
}

export default function RatingTable(props: RatingTableProps) {
  const RatingBodyTemplate = (rowData: UserRating) => {
    return (
      <Rating
        value={rowData.rating}
        onChange={(e) =>
          props.onRatingsChanged(rowData.subjectNickname, e.value ?? 0)
        }
      />
    );
  };

  return (
    <div className="datatable-templating-demo">
      <div className="card">
        <DataTable value={props.ratings} responsiveLayout="scroll">
          <Column field="subjectNickname" header="Player"></Column>
          <Column
            field="rating"
            header="Rating"
            body={RatingBodyTemplate}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
