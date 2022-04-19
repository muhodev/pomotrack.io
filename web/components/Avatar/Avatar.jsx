export function Avatar(props) {
  return (
    <div className="w-9 h-9 rounded-full bg-purple-color text-main-color font-medium text-sm flex items-center justify-center cursor-pointer">
      {props.name}
    </div>
  );
}
