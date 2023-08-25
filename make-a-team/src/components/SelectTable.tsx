import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export interface Nickname {
  nickname: string;
}

interface SelectTableProps {
  nicknames: Nickname[];
  handleSelect: (selectedNickname: string) => void;
}

export default function SelectTable(props: SelectTableProps) {
  const selectButtonTemplate = (rowData: any) => {
    return (
      <Button
        label="Select"
        className="p-button-secondary"
        onClick={() => props.handleSelect(rowData.nickname)}
      />
    );
  };

  return (
    <DataTable value={props.nicknames}>
      <Column field="nickname" header="Nickname" />
      <Column header="Select" body={selectButtonTemplate} />
    </DataTable>
  );
}
