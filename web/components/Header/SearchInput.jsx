import { TextField } from "components";

export function SearchInput(props) {
  return (
    <TextField
      value={props.value}
      onChange={props.onChange}
      placeholder="Search projects and tasks"
      size="small"
      className="bg-surface-color"
    />
  );
}
